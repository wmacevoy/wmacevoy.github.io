# Sé — Microsoft getting out of the lunch line.

Microsoft for devs is cafeteria food.  Even when they're good they can't get over the stigma, and sometimes they are not very good.
![bad cafeteria food from https://www.dosomething.org/sites/default/files/FedUp_1.1.pdf](microsoft-etc/food-bad.png)

The core is this: Microsoft was the gorilla in the game for a long time, and now they are looking more and more like an also played.  They are using new tactics, but it seems like they really don't get it yet.  Like an alcoholic that hasn't yet hit rock bottom and really turned around.  They really are trying. ![bum statue](https://c1.staticflickr.com/2/1367/863720665_8d9f2b1f19_b.jpg)

Here is what I wish they would do:

> Ditch Windows.

Harsh but true.  They need to buy [wine](https://www.winehq.org) and build the next release of windows *on top of* the Linux kernel.  The result will still be called windows, but you get my point. This fixes so many problems.

Search stackoverflow for a solution to almost anything, and you will find out how to solve it in unix.  Devs mostly don't care about solving something in windows, because they aren't about to deploy 5GB licensed containers to the cloud when they could deply 5MB free containers to do the same thing.  If windows was a managed stack over linux, then those containers might shrink to the point they don't create bursts of laughter at dev office parties.
![laughter](microsoft-etc/laughter-775062_960_720.jpg)

Windows virtualization sucks.  Hard.  VMWare, VirtualBox, Docker, Vagrant.  Mac/linux users rejoice in options and freedom of fluid management and deployment of dev ops.  Oh, wait, shit, you're running windows.  Three days of googling and BIOS reboots later you fear changing anything on your computer.  If Microsoft adopted a linux kernel (and therefore ditched Hyper-V, the most awful thing they have recently shat on developers), and chose to never license windows on a x86 laptop that did not have virtualization in the CPU that existed and was *enabled*.  Suddenly windows devs can tango with everyone else, and containers work for *apps* to make clean windows deployments, so devs can make more reliable applications for consumers with less effort.
![By Anouchka Unel - Own work, FAL, https://commons.wikimedia.org/w/index.php?curid=844853](microsoft-etc/tango.jpg)

Microsoft makes bank on Office and .NET (Services built on .NET), not Windows.  If they make a .NET licensed over Linux, all those devs rejoice and Microsoft has a chance in IoT.  Since there are many similarities between OS X/iOS and Linux/Android, it is a much smaller effort to maintain .NET if you leave windows out of the picture.  Voilà! With Office built on top of .NET, you have a much smaller effort to maintain the suite on the platforms of the future.

Only geeks care about the Kernel.  If Windows 12 is some fancy wine over a Linux Kernel, Microsoft has to take some jabs.  But the geeks will buy it when they see the same stackoverflow solution works for them, even in Windows.  And if it means consumers see Fruit vs. Zombies in windows and they get the same "toss it in the trash if you don't like it" install/remove experience, those geeks might make "Fruit vs. Zombies" for your Surface Pro.  Most importantly, office workers around the world will be happy to see a fully functional office on their tablets, and will not care that Microsoft SQL Server was running on the cloud to keep track of their toilet flushes.

## A call to digital arms

The virtualization manifesto.

* Never shall I ever deploy a container that cannot be deployed in a standard linux container stack.
* Never shall I ever use Hyper-V.
* Never shall I ever recommend an x86 laptop that does not support virtualization (Intel VT-x or AMD RVI).

I know! — Warren MacEvoy

[Issues?](https://github.com/wmacevoy/wmacevoy.github.io/issues/2)
