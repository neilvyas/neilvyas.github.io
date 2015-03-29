---
layout: post
title: "On Hiring Data Scientists"
type: posts
---

It's widely held that data science is "the sexiest job of the century," and thus, as you can imagine, there are tons of people from a wide variety of backgrounds trying to get into the space. At work, we have been nonstop interviewing people for months now, and yet we very rarely find that perfect candidate. Actually, forget even perfect - many of the people we interview have disturbing gaps in their foundational knowledge, even as they do bleeding-edge research at top graduate programs.

I won't be going into personal detail in order to protect the identities of everyone involved and/or risk damaging their potential careers, but some of these incidents may help shed some light on the sentiment that we're in a DS bubble. **Beyond that, I'm well aware that in high-pressure interview environments, people don't perform at their true ability. Additionally, the content of this post is drawn exclusively from my own experience and the views expressed are my own and do not represent those of my company.** What I'm trying to communicate here is the foundational inconsistency these answers reflect and the confidence with which they were given. [This DataTau thread](http://www.datatau.com/item?id=6758) has some interesting discussion that mirrors some of what I'll say here.

You can skip the following two sections and just read the conclusion section if you're not interested in specific examples.

Let's investigate two cases; there were some other instances of shocking answers when tested on extremely basic material, like the meaning of confidence intervals and p-values, and calculating expectation of various games, but these are examples of candidates whose foundational shakiness we discovered very late into the process.

**entropy and random forest**
<hr>
We had someone talk at length about entropy in random forest. Usually, when asked about random forest, reponses will be along the line of "they correct overfitting in decision trees," which is correct, but is essentially the first line of the wikipedia page. You can find more information about the connection between entropy and random forest [here](http://www.cip-labs.net/2013/01/17/introduction-to-random-forests/), but the gist of it is that the objective/cost function used is information gain/entropy, so you're trying to maximize information gain and minimize entropy.

What this hinges on is an understanding of information-theoretic entropy, or Shannon entropy. The entropy H of a random variable is defined as the expectation of the self-information of the random variable. This sounds very esoteric until you think of self-information as surprisal, which basically means how surprised are you that you observed a particular outcome. In this way, the formulas that follow are very natural:

$$
\begin{align*}
  & I(X) = - \log P(X) \\
  & H(X) = E[I(X)] = - \sum p_{i} \log p_{i} \\
\end{align*}
$$

In order to check this understanding, we gave the candidate a question of this form:

>Suppose you have a random variable whose pmf is given by
>
>| e | 1/2 |
>| t | 1/4 |
>| q | 1/8 |
>| z | 1/8 |
>
>How would you most efficicently encode, without loss, samples of this random variable?

The answer we received, with complete confidence, was something like

| e | 1/2 | 00 |
| t | 1/4 | 01 |
| q | 1/8 | 10 |
| z | 1/8 | 11 |

This is a worrying answer because not only is it not correct, it also doesn't make use of the information given, which is the pmf of the random variable. That information is vital in solving the problem correctly, and even if you don't know off the top of your head the definitions that were discuessed earlier, it should be reasonable to suppose that encoding all value with the same number of bits when they don't have equal probabilities of appearing isn't the best approach. As validation, a colleague of mine didn't know much about information theory, but was still able to give the correct answer by reasoning through it.

A possible correct encoding is given by

| e | 1/2 | 0 |
| t | 1/4 | 10 |
| q | 1/8 | 110 |
| z | 1/8 | 111 |

And because of symmetry in 0/1 we can create the other correct solution by just flipping bits. This solution can be checked using the definitions above and everything makes sense.

**invariant probability distributions and markov chains**
<hr>
I wasn't present for this one, but apparently the candidate talked about this at length. You can find a paper that goes into more detail [here](http://www.math.missouri.edu/~evanslc/Markov%20Chains.pdf), but I'll just give a quick overview.

Essentially, consider the stochastic matrix that represents the transition probabilites of the Markov Chain in question. Given some nice properties of the Markov Chain in question, you can find a vector of initial probabilities that is unchanged by the action of the Markov Chain, e.g. you can pass in your initial probability distribution, let the Markov Chain "run for a long time," then come back, measure the system, and observe the same probability distribution. For example:

$$
\begin{align*}
  & \left( \begin{array}{ccc}
1/2 & 1/3 & 1 \\
1/2 & 0 & 0 \\
0 & 2/3 & 0 \end{array} \right) \left( \begin{array}{ccc}
p_{1} \\
p_{2} \\
p_{3} \end{array} \right) = \left( \begin{array}{ccc}
p_{1} \\
p_{2} \\
p_{3} \end{array} \right) \\
  & yields \\
  & \left( \begin{array}{ccc}
p_{1} \\
p_{2} \\
p_{3} \end{array} \right) = \left( \begin{array}{ccc}
6/11 \\
3/11 \\
2/11 \end{array} \right) \\
\end{align*}
$$

We asked the candidate about determinants and eigenvectors, mainly to suss out whether they knew not only the definitions but also the conceptual underpinnings that related these concepts to the one being discussed. The responses were largely unsatisfactory, which was disturbing because fundamentally all you're doing here is finding eigenvectors. In fact, the nice properties observed when studying this topic (with some constraints on the stochastic matrix) arise as a result of the [Perron-Frobenius Theorem](http://en.wikipedia.org/wiki/Perron%E2%80%93Frobenius_theorem).

**conclusions**
<hr>
Again, I'd like to emphasize that everything written here does not represent the views of my company. Additionally, I'm not here to rag on PhDs or make fun of people. These are just my observations as someone who's had intimate experience with the data science hiring process on both sides of the interview table.

I think the number of people flooding data science is just a function of the appeal of the job and its visibility in the media. Beyond that, it seems like a very standard exit op for PhDs who aren't destined for academia; you get to do research and have all the perks of a job in the tech industry. However, the number of truly qualified and capable people seems to be much smaller than the market for data scientists. Obviously, my observations suffer from survivorship bias because the "good" data science candidates are out of the recruiting pool pretty much immediately, and I don't work for a big tech company.

What's more worrying is that people are doing advanced research without a complete and rigorous understanding of the fundamentals of the field. I don't know what kind of significant cryptography research you can hope to do if you don't know what a finite field is, for example (this actually happened, too). I know that doing a PhD necessarily narrows your focus extremely. But I'm not asking for everything you learned as an undergraduate; I just want what I know are very important, fundamental concepts in the field your degree marks you as an expert in. And when that understanding isn't present, I lose confidence in the validity of your accomplishments.
