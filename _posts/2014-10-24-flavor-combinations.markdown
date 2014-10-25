---
layout: post
title:  "Open Problems in Gastronomic Number Theory"
date: 2014-10-24 19:41:16
categories: posts
location: Austin, Texas
tags: musings mathematics
---

This is a collection of various interesting discussions that have transpired in Kinsolving Dining Hall. Yes, this is what happens when you give a group of highly analytical people an implicit monetary incentive to eat at the same place so regularly (why can't dine-in dollars be as ubiquitously accepted as Bevo bucks?). I posed an interesting question about the subtleties of implied meanings in relatively innocuous syntax, which might end up presenting an interesting research project in NLP, which was then followed up by another interesting question. 

##SOME QUESTIONS

*Find a compliment such that appending "now" to it does not make it an implied insult.*

This was the question I posed, and I had been mulling it over for quite some time prior to this conversation. The answer is left as an exercise for the read- just kidding! This blog isn't a math textbook (yet)! It was solved conclusively surprisingly rapidly.<!--preview--> I don't recall whether or not I came up with this question completely independently, or I had the germ of the idea implanted in me from some outside source. Read that as "I want to say that I came up with it on my own, but it's really from a Day[9] video I can't find on youtube anymore." 

Essentially, this comes down to finding a state with the quality "good" such that the absence of that state is still "good," or at least not "bad." This is actually pretty difficult because of how implication works. A simple example is "You look pretty, now!" Obviously, there's no implied insult here. Explicitly, it's still a compliment - in your current state, you're pretty! But what it implies is that prior to now you weren't pretty, which is "bad." Therefore, this compliment doesn't work.

The final crowdsourced solution was "You have a very diverse resume now!" Personally, I don't like the use of such a specific thing - resume - as a solution, but I think it's actually the specificity that makes it a valid solution. Is having a resume that's not diverse bad? Apparently not according to a bunch of science kids.

Still thirsty for more interesting questions? Have another:

*Find three foods such that all pairwise combinations taste good, but the combination of all three together tastes awful.* 

This is actually an open problem; no one's come to me with a solution. The rules are that you can't just pick liquids, because then you can abuse texture (e.g. "soak chips in a glass of water" - no!) and it becomes trivial. Additionally, the constraint is that all components of the combination must be present in your mouth at the same time. This stipulation means that you can eat the foods in sequence, which helps mitigate awkwardness (e.g. eating ). Of course, there's also the very valid point that taste is very subjective, which basically shoots a hole in the question to begin with. If you could objectively define what tastes good and what tastes bad, not only would you make this question tractable, you would also make it trivial, since you can just assign foods values for their tastes and then use a simple algorithm to find three that satisfy the question. Disproving it also becomes trivial. Actually, now that I think about it, this is very similar to automated theorem proving, or automatically determining whether or not a statement is a well-formed-formula in a first-order logical system (now you can complain that this is a math textbook). Your axioms are which flavors taste good and bad, and your rules of inference are the combination rules. <a href="http://www.cs.utexas.edu/~robertm/Resources/papers/tds.pdf" target="_blank">My friend actually just did a project on this subject.</a>

Since a rigorous definition wasn't tenable, we opted to use a consensus system to decide whether or not a proposed solution was valid.

My approach was to find two very opposite flavors that tasted good together, and then find another strong flavor which would ruin their combination. The base pair I started with was ice cream and french fries, but I couldn't come up with a third that satisfied the two remaining pairwise combinations and yet tasted awful with ice cream and french fries. Then I tried to use crawfish and wasabi, but again I wasn't able to come up with a third. I don't know if this strategy is capable of yielding a solution.

Another strategy proposed was to find two foods such that combining both of them yielded an entirely new flavor, and then finding something that tasted terrible with that new flavor. I think there's really a problem with the central, implicit assumption in this (admittedly undeveloped) strategy, in that you assume that finding pairwise combinations of flavors is easy, because you're assuming that the third ingredient will go with the other two easily. However, since you're reduced the 3-combination to a pairwise combination, and you're then trying to prove that that final pairwise combination is bad, you're contradicting the central assumption that allows you to easily pick a third ingredient. Sure, you don't necesarily have to assume that pairwise combinations usually taste good, but then you lose one of the best benefits of this strategy, in that you only have to worry about finding a combination of two flavors that tastes bad, since you now have to check the other two combinations. 

That said, I like this strategy a lot because it does something clever that's at the heart of mathematics; namely, it takes a hard problem and reduces it to an easier problem, one that has hopefully been proven. In this case, you're going from dealing with pairwise combinations and a 3-combination to only dealing with pairwise combinations, which is much simpler. Even if this isn't the winning strategy, I still think it's a great way to approach the problem. 

