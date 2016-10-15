---
layout: draft
witty: /cantorexample
title: An Intro to Measure-theoretic Probability
excerpt_separator: <!--more-->
---

The central conceit of being an undergraduate is saying stuff that sounds cool without fully
understanding it. Dually, the central problem of dealing with undergrads is being quoted at. Hate
infuriating platitudes? I've got a couple any aspiring probabilist has parroted at some point:

> There's nothing random about random variables.  
> Probability and Statistics - it's actually all just geometry.  
> Sigma algebras are about *information, man.*

Today, we'll help you wipe the smug grin off that offending freshman's face and replace it with
intimidation and awe. We'll define random variables, probability spaces, and distribution functions
using measure theoretic language. I won't get too formal, but will include formal details in
footnotes for interested readers.
<!--more-->

Spaces, Functions and Measures
==============================

Random variables are just measurable functions from $\Omega \to \mathbb{R}$.

Then probability distributions of random variables are really just push-forward, or induced, measures.

Information
===========

$\sigma(X)$ for a random variable $X$

Independence: $\mathcal{A}_1, \mathcal{A}_2 \subset \mathcal{F}$ are independent iff for every $A_1 \in
\mathcal{A}_1, A_2 \in \mathcal{A}_2$, we have that

$$P[A_1 \cap A_2] = P[A_1] P[A_2].$$

Consider $\mathcal{A}_1 = \sigma(X), \mathcal{A}_2 = \sigma(Y)$.

Ramalamadingdong-change-of-measure
==================================

$$\nu(A) = \int_A f d\mu$$

We say $f$ is then the **Radon-Nikodym Derivative** of $\nu$ with respect to $\mu$, or $f = d\nu /
d\mu$. You should think of $f$ as some kind of *density* - say the space we're over is a map of the
US, and let $\nu$ be the population of any given area and $\mu$ its area in square miles. Then $f$ is
really the *population density of a given area*, in the sense that if we integrate population density
over an area we get total population.

If $\nu$ were absolutely continuous with respect to $\mu$, that would mean that wherever the land
area is zero, the total population is also zero. Since this is correct, we have that $\nu \ll \mu$.

Decomposing Measures
====================

Since these two properties are apparently not the same, we should find a counterexample to prove it
to ourselves. Before I reveal it to you, let's think about the properties we want our counterexample
to satisfy:

Here's a visualization over just the interesting interval[^cantor_code], since a picture is worth a
thousand words, and a gif five minutes of head-scratching:

![](/static/posts/cantorexample/cantor_distribution.gif){: .responsive }

Somehow, this function gets from 0 to 1 but is flat almost everywhere. Even better, you can prove
that this thing is continuous, miraculously[^continuity], which is even better than the
right-continuity we desire. This class of distributions are known as **singular distributions**, and
fulfill the following interface:

[^cantor_code]:
    Here's some quick-and-dirty code I whipped up to generate this plot. You don't want to push it
    past about 21 iterations:

    ```python
    def cantor_iteration(a, b):
        a1, a2 = a
        b1, b2 = b
        sub_div, avg = 1.0 * (b1 - a1) / 3, 0.5 * (b2 + a2)
        return [a, (a1 + sub_div, avg), (a1 + 2 * sub_div , avg), b]

    def reiterate(intervals):
        """Take a set of intervals and recursively cantorize each subinterval."""
        elems = len(intervals)
        if elems == 2:
            a, b = intervals
            return cantor_iteration(a, b)
        else:
            return reiterate(intervals[:elems / 2]) + reiterate(intervals[elems / 2:])

    memo = dict()
    def cantor_distribution(iterations, a=(0, 0), b=(1.0, 1.0)):
        if iterations == 0:
            memo[iterations] = [a, b]
        if iterations in memo:
            return memo[iterations]
        else:
            res = reiterate(cantor_distribution(iterations - 1, a, b))
            memo[iterations] = res
            return res
    ```

[^continuity]:  
    In particular, there's a rather incredible argument that involves asserting that there
    are only *countably many* jumps in the Cantor distribution. The way you get to this is by invoking
    the density of $\mathbb{Q}$ in $[0, 1] \subset \mathbb{R}$; in particular, for something to be a
    "jump" it must contain an open interval, and thus you can always find a rational number in that
    interval by the density argument. Then, because of the properties of the distribution function, we
    have that all these intervals across all jumps are disjoint, so we must have only countably many
    jumps, since there are only countably many rationals in the interval $[0, 1] \in \mathbb{R}$ and each
    jump is uniquely identified with one such rational.

    Since the "jumps" are the only things that can ruin continuity, as the rest of the function is
    just flat, we have that making sure there's only countably many jumps lets us complete the proof.
    Why did we have to do all this density-of-the-rationals business? Well, think about what we
    wanted to do: we wanted to show that there was only a "nice" amount of jumps, where "nice" here
    means countable. Ideally, we could show that each jump was at least some $\varepsilon > 0$ and
    then the argument is trivial. But think about the construction of the Cantor distribution - for
    any given $\varepsilon > 0$, we can always find some iteration $n$ after which all jumps are
    smaller than $\varepsilon$, so this "explicit" approach is no good. How else can we characterize
    the jumps, if we can't use length directly? Well, if we say a jump has a "start" and an "end,"
    then even though those two numbers can be arbitrarily close together, they must be distinct, or
    the jump's not a jump and we're done. We can't necessarily fit a fixed number in there, but what
    we can fit in between those "start" and "end" points is an open interval - *et voila*, we've
    arrived at our crazy argument.

    This kind of non-obvious or subtle argument is quite common in mathematics that has to deal with
    different notions of infinity as a "secondary" concern; it's been interesting brushing up against
    it so often as I'm studying measure theory.
