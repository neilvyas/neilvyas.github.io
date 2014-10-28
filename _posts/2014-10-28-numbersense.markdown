---
layout: post
title: The Sixth Sense
date:  2014-10-28 11:35:52 
categories: posts
location: Austin, Texas
tags: mathematics programming
---

Over the past few years, I've noticed that my mental math capabilities have fallen off sharply. I used to be able to estimate things frighteningly quickly, and I could also give you the precise answer in a small amount of time. However, it seems like as I've gotten better at math, I've gotten much worse at arithmetic. 

Therefore, I've resolved to improve my numbersense abilities. Since I have been doing a lot of work related to time series analysis over the past month, I figured I could perform some analysis on my improvements (or lack thereof) over time as well.<!--preview-->

To do this, I've written a simple script in python that has me add and then multiply two random two-digit numbers. It times me, and then records the date and time taken to a csv file. For increased accuracy and to compensate for really easy questions, I have to get multiple questions right, and then it records the average of those times. If I demand more questions correct, my data will be more reliable, but I'm less likely to take the test daily. I've settled on demanding 4 correct answers as my parameter for the test.

In addition, I'm also recording the quantity of failures and the mean time for failed attempts. This can be kind of problematic if I don't fail at all, since then the mean time to failure is zero; I'll probably plot this as a scatterplot to account for that, since plotting the time series straight might look funny because of the jumps to zero.

I start tonight. Hopefully, not only will I increase my mental math acuity, I'll also have an interesting and relevant dataset to analyze.