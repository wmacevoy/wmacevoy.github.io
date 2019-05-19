# Sé — Docker and Computer Science Education

As an undergraduate professor of computer science, I would love to have a how-to for Virtualization in Windows that made any sense.

![dead whale from https://getintodevops.com/blog/keeping-the-whale-happy-how-to-clean-up-after-docker](docker-etc/dead-whale.png)

Right now, the inability to use Docker containers in a simple reliable way that composes with the use of common virtualization (not hyper-v) in windows guarantees the students with windows laptops will have a poor experience with containers.

My ability to use containers in the classroom is blocked by this. The ability of Docker, the company to have CS majors with a working and positive experience with containers is blocked by this as well.

This is not a small thing: I keep hoping to try containers to help fix compatibility issues across student dev environments, and instead I only find new ones. It is not reasonable for the “hello world” to be a glossy discussion, followed by a 10 page essay on choices and compatibility problems that is a mile deep for some sophomore who just wants their node app to run like everyone else’s.

![moby docker in windows https://docs.microsoft.com/en-us/virtualization/windowscontainers/deploy-containers/linux-containers](docker-etc/mobyvm.png)
![lcow docker in windows https://docs.microsoft.com/en-us/virtualization/windowscontainers/deploy-containers/linux-containers](docker-etc/lcow-approach.png)

Windows containers almost profoundly do not matter: nobody deploys them, they are almost always a bad idea, and nobody will consider teaching how to use them. Their introduction to the fray greatly harmed the original simplicity of the docker model: now there are red and blue ones. No-one uses the red ones, but they break everything and, oh, they are the only ones you can easily use in windows.

Docker, please, please, prioritizes a solution that supports your principle goals: simple compatible linux containers. For devs to enter the market with positive experiences, this means having that work in windows without hyper-V so they can use it in combination with other virtualization tools.

## A call to digital arms

It ain't a container if...

* If hello world is over 1GB, it ain't a container.
* If making a container means you can't run it on 98% of stacks, it ain't a container.
* If the typical directions for running containers does not work on your platfor, it ain't a container (platform).
* If running your thing means turing stuff off for all the other things you do, it ain't a container (platform)

Gently ask docker to focus on their original killer app idea: maintainable, composeable, lightweight linux containers.

I know! — Warren MacEvoy


