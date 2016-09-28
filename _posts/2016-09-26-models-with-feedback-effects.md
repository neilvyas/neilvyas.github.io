---
layout: post
witty: /fillmein
title: Models with Feedback Effects
category: technical
---

Model development and deployment is an iterative process, with teams striving to improve models
quickly and safely in order to collect more payout. One of the best sources of extra performance is
more training data; for many applications, production usage *is* the training data. But what happens
when new training data is "filtered" by the production model? Like growing up in an isolationist
cult, does this present a dangerously incomplete view of the world to all future models?

Let's explore a couple concrete examples of what I mean. Suppose that I'm a transactions platform
interested in fighting fraud. As I'm able to reduce fraud, I can lower my rates, thus driving ever
more transactions to my platform in a virtuous cycle, so having a continuously improving fraud model
is important to me. However, note that my knowledge of fraud is *asymmetric* - I only know that a
given transaction, and by extension, its corresponding feature vector, is fraudulent if I allow that
transaction to occur in the first place. With my production model (hopefully) limiting fraud, I might
choke myself off to sources of training data, stymying future research efforts as well as model
training.

Now, consider what a good retraining process might look like. Hopefully, it's automated, with members
of the modeling team submitting "challenger" models to a service that automatically evaluates their
performance against status quo on some sampled or generated test sets; perhaps it even darklaunches
the models so they can test against production data. So far, this sounds awesome, right?  But notice
all the places that this "selection bias" is propagating - in the selection of the test sets the
challenger is evaluated on and against transactions that the production model let through. This means
that ceteris paribus, with the training process producing classifers with monotonically increasing
performance, we'll build up a sequence of classifiers that only add predictive power in a narrower
and narrower domain - the false positives of previous models.

TODO include a graphic of nested sets here. Go draw it!

Is this even an issue? Well, here's a toy example that might sway you:

TODO do an example with 10k training points where we compare 1 model trained on everything and a
sequence of two models with one being trained on 1000 examples and being applied to the resulting
9000 to generate a "filtered" training set - might need to discuss payoffs to make this worthwhile

TODO make this less contrived? 

![decision boundaries](/static/posts/fillmein/decision_boundaries.png){: .responsive }

It looks like a Kyogre or something, where the red is positive (and fraudulent) and the soft blue
underbelly is where you make your money. You can see that the models for which we're modeling a
retraining process with feedback loops seem to have much less confident decision boundaries than the
model which just saw the entire training set at once.  This is reflected in their much greater false
negative rates, which translates to less good transactions cleared. TODO figure out whether this precise 
behavior is as expected 

![rocs](/static/posts/fillmein/ROCS.png){: .responsive }

... i will eventually figure out something intelligent to say about this


Go Neil! You can finish this analysis! With the utility stuff! And make sure to post the notebook link somewhere!

Generally, what we're dealing with here is a *feedback effect*, where model $n$ in a sequence of models
has an effect on models $k > n$. I think of what we just described as a zeroth-order effect, since the
model isn't actually *changing any underlying behavior*, only what we observe. That's not to say that
our fraud example doesn't suffer from any other feedback effects, though - consider that fraudsters
will definitely be trying to "learn" the model as best they can so that they can get through it. We
won't bother worrying about anything adversarial just yet.


Payoffs - probably worth splitting off into another post
=======

We can reason through this using the language of payoffs to find out what the costs we incur are.
Basically, we'll be "buying" fraudulent training data, in the hopes that with enough orthogonal
training data, we can maintain a complete view of the world. You can find a great intro to this topic
for two-class classification by BFS'ing from [here][mldb], but I'll give a two-part overview below.

For a two-class problem, our model can have one of four results:

1. A true positive;
2. A true negative;
3. A *false positive*, where we predict a truly negative $x$ to be positive; and
4. A *false negative*, where we predict a truly positive $x$ to be negative.

Modelers use various metrics to evaluate the quality of a two-class classifier, and a very common
family of these metrics is built off of what's called a *confusion matrix*: it records the frequences
of each of the results we described above in the test set. However, this performance measure is
pretty abstract - how do I pick between a two models that have otherwise the same performance, but
one is conservative and favors false negatives over false positives, while the other is more
ambitious, preferring false positives to false negatives?

This is where having a **payoff function** comes in. A payoff is a function from classifier results
to "utility," which often turns out to be dollars, like in our fraud example, but in principle can be
anything (for you economists out there). A bold claim:

> If you don't have some idea of what your payoff function looks like, you have no business trying to
train predictive models.

A payoff gives us the most "real-world" measure of our model's performance. The trick is that we can
throw just about everything into our payoff function. Are you scared that by rejecting too much
fraud, we won't be able to train good models in the future? What you're actually saying is that you
want to add an additional bit of utility to the false positive term of your model (or layering on
another model which decides whether or not to allow your fraud model's true negatives to go through
anyway). The price you pay for this flexibility is that this function can get hard to compute,
understand, or even specify as you pile more terms in. We can state its basic form very elegantly,
however:

$$\begin{align*}
  u_m(x) &= u(m(x) = 1, x = 0)P(m(x) = 1, x = 0) + \ldots \\
         &= u(m(x) = 1, x = 0)P(m(x) = 1 \mid x = 0)P(x = 0) + \ldots \\
         &= u(FP) P_m(FP) P(x = 0) + \ldots \\
         &= u(TP) P_m(TP) P(x = 1) + u(TN) P_m(TN) P(x = 0) + u(FP) P_m(FP) P(x = 0) + u(FN) P_m(FN)
P(x = 1),
\end{align*}$$

In plain english, you can read this as "for each input, the value of getting it right plus the value
of getting it wrong, discounted by the likelihood each case." Now this looks like something we can
use to pick between models effectively! However, you can see that there's quite a few terms that will
prove really difficult to estimate, so we can *weaken* this measure by slapping on an
expectation-over-$x$ operator:

$$\begin{align*}
E_{x\in X}[u_m] &= E[u(FP) P_m(FP) P(x = 0) + \ldots] \\
                &= E[u(FP) P_m(FP) P(x = 0)] + E[\ldots] \\
                &= u(TP) (TPR) r_p + u(TN) (1 - TPR) r_n + u(FP) (FPR) r_n + u(FN) (1 - FPR) r_p,
\end{align*}$$

where $TPR$ is the *true positive rate* of our classifier and $FPR$ is the *false positive rate*,
computed in the obvious ways, and $r_p, r_n$ are the proportions of positives and negatives in the
population, respectively. Note that using $TPR, FPR$ is just one possible parameterization of this
problem (but definitely the most common).

You can finish writing this section and make it cohesive!


Imputation Strategies
=====================

Obviously, the best training set would be generated by the most permissive model. But we can't do
that economically because we'd be out of business. What we can do, however, is let through just a few
"representatives" of types of transactions we think are likely to be fraudulent and then keep count
of how many of its ilk we see. We can then weight this sample of representatives by the volume of
similar transactions we saw to really flesh out our training set.

All you have to do now is write the code to make this work GO DO IT


Conclusions
===========

The problem of dealing with feedback effects is a really difficult one, and one that's encountered by
many modeling teams today. There are some strategies for dealing with it, some of which I've
detailed, but I'm not sure that there's an established modus operandi.

<small>
*Thanks to TODO for proofreading this.*
</small>

[mldb]: http://blog.mldb.ai/blog/posts/2016/01/ml-meets-economics/
