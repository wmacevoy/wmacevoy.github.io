
# Sé — python vs real languages

We have all felt that draw.  So easy.  So simple!  

Nope.  No not really at all. Here are my most agredious problems with python.

## Errors are discovered at runtime.

Yes, this is the third time I ran that 3 hour batch job.  Each time it completed to 99.999% (litereally, 100,000K cases), just to fail on a typo in the code for the last case.  Each bug is something a strongly typed language would have found in the IDE.  Instead I have to write a million tests to make up for the lack of automatic checks a strongly typed language just makes for me.  And cross my fingers each time I try.


## Yes, that indentation thing.

It doesn't just suck a little.  Any descent editor will auto-indent code for you; which is a great way to find structural mistakes.  It also makes it easy to copy chunks of similar code around to modify.  Except in python.  And don't get me started about the confused meaning of spaces vs tabs, so indentation can be logially wrong but visually right.  Simply horrifying.

## Nothing is really simple.

How many ways can we format a string?  How is `None*3` a great way to make a fixed length array.  And ++i means nothing like everyone else thinks it should mean.  As a beginner language, where did this become the obvious choice for initializing a base class:

```python
class A:
    def __init__(self,number):
        pass

class B(A): 
    def __init__(self):
        super(A, self).__init__(1)
```

## import hell

Try to port some Java or C++ architecture to Python.  Just try.

Java doesn't let you worry about it (just compiling takes forever), C++ lets you fix it (by factoring header files from implementations).  Python just lets you look accross the fence at a greeen field...



