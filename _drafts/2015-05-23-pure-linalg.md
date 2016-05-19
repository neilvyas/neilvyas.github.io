---
layout: post
title:  "Pure Linear Algebra"
type: posts
tags: math optimization linear algebra
---

This semester, I had the opportunity to take honors linear algebra with Dr. Hadani. I think this class will forever hold a special place in my heart, since I found myself genuinely depressed the day after it ended. However, that's not really what this post is about. 

I decided to take a week off from work after exams. Nominally, this was to come back home and spend some time with my family, but because I'm the only one without any responsibilities, it basically became a vacation. As a totally normal person, I spent my vacation time studying ("studying"), and watched all of the lectures for Dr. Boyd's [EE364A][], which is an introduction to convex optimization. I also started on [EE263][], introduction to linear dynamical systems.

The first five lectures (!) of linear dynamical systems are just a linear algebra overview, and furthermore, they're not even a really great one. Judging by the comments and questions, I'd reckon that few if not none of the audience has had a 'pure math' linear algebra class, which is saddening because it would have obviated all of that material. In addition, I found my understanding of linear algebra from the theory perspective was really helpful in allowing me to understand what exactly was happening even when ridiculous things that I didn't understand (the hundred different names for sparsity patterns and interpreting them, various decompositions, numerical methods, etc) were introduced and used. 

However, the course website does recommend Axler's *Linear Algebra Done Right*, which is probably my favorite linear algebra book, aside from Axler's very strange (and uncessarily verbose) proofs.

Furthermore, there was a rather strange comment made in one of the lectures - "this is the first time linear algebra won't be boring." I don't know what a normal linear algebra course is like - my roommate's was awful, and I'm not a huge fan of the Strang one on MIT OCW - but I don't think linear algebra could ever be construed as boring by the undergrads it's normally presented to. Boyd himself goes on to say that he was "unenlightened" and made some stupid claims about solving the dual problem faster in the case of $# variables >> # inequalities$, but then realized that that advantage was due only to stupid numerical linear algebra.

I know this post was light on content, but I wanted to get this out there, even as a severely under-developed idea. Additionally, I want to write some sort of math curriculum website, similar to one UCF wrote for options, that focuses on integrating different fields to give motivations and contexts for a lot of pure mathematics. Without knowing the underlying pure math, people go off and do silly things or even, god forbid, rediscover and mangle it; Boyd constantly calls out other fields for doing similar things in his convex optimization lectures. However, it's obviously not the correct approach to dump a pure math education on everybody, so I was hoping that I could find the optimal hybrid. Examples abound; for example, convex optimization was the first motivating use of multivar/vector calculus I've seen in a long time.

[EE364A]: <http://stanford.edu/class/ee364a/lectures.html>
[EE263]: <http://stanford.edu/class/ee263/>
