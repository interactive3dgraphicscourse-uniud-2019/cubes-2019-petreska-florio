# Modeling and rendering with cubes

![Image from Crossy Road game](http://vignette2.wikia.nocookie.net/crossyroad/images/a/a0/Unnamed.png/revision/latest?cb=20150716180741)

## Prerequisites

- read carefully all slides and notes up to lecture 8 before you start. Try the proposed exercises.
- familiarize with git and github:
	- [Codecademy’s Learn Git](https://www.codecademy.com/learn/learn-git)
	- [Git Resources for Visual Learners](https://changelog.com/posts/git-resources-for-visual-learners)
	- [Introduction to GitHub for Newcomers](https://www.youtube.com/watch?v=uNa9GOtM6NE&feature=youtu.be)
	- [Github desktop application](https://desktop.github.com)
- [download three.js r84 and examples](https://github.com/mrdoob/three.js/archive/master.zip)

## Hints

- Try to work out a basic project which satisfies all requirements well before the deadline and as soon as possible: you will then use the remaining time to refine, improve and polish.
- If you are stuck for too much time on a problem, ask for help, preferably in the forum.
- the process is as important as the result. Use this project to learn a workflow, and how to use tools effectively. Experiment, and try to come up with efficient, elegant, and well commented code.
- commit often in your git repository and with meaningful comments. 

## Goals 
In this project you'll first create an interesting scene of your own design, made up just of cubes. The cubes can be
translated, scaled and rotated as you wish. For inspiration, look at [Minecraft](https://minecraft.net/en-us/), 
Legos, and voxel-based games such as [Crossy Road](http://www.crossyroad.com).

I am not expecting something highly complex, but I expect something **interesting** and that you use **at least 30 cubes**.

In addition, provide your model with a simple but meaningful animation. To do this, you'll have to structure the scene
graph in a convenient way. The animation can continuosly play itself, or can be controlled by the user through UI controls.

After creating a scene, you have a choice:

- if you are more interested in programming, you can choose to create a terrain for your scene, using a heightmap in the
form of a greyscale image as input;
- alternatively, you can choose to create a short movie that presents your scene.

In either case, see the next sections for more detailed instructions and suggestions. You are also required to document your
work and write a final report, as detailed below. 

## Starting code

I have provided two starting scenes, one without lights and textures, and one which includes a basic lighting setup 
and an example of texture usage. Your final result should be obtained by modifiying ONE of these files. 

Choose the one you prefer based on the kind of result you want to obtain, and how much you want to experiment with features we haven't yet explained in our lectures. You are free to do any modifications, including replacing my code, e.g. to use an orthographic camera instead of a perspective one.

For the cube materials, without lights you can use MeshBasicMaterial for solid, textured, or wireframe rendering. 

When using lights, it is better to use MeshPhongMaterial for the cubes. The example also includes some code to render shadows; if you like the effect, you'll need to write similar code for all the boxes you will insert, or you can remove it entirely for rendering without shadows.

The third starting code file is necessary only if you choose to create a terrain. It loads a *m by n* PNG image from a file and builds an array of *m x n* values where each value is a greyscale value in the range 0-255. The code assumes that the image is composed by four channels (RGBA) and the value of the three RGB channel is the same. If you use another kind of image, you will have to modify the code accordingly.

## Steps 

1. clone the starting code in the repository.
2. examine the starting code carefully. In the case of the code which uses lights, we are using stuff that has not been explained in the course yet. However, with some help from the [three.js documentation](https://threejs.org/docs/index.html#Manual/Introduction/Creating_a_scene), it should not be too hard to figure out what each line does. Try to play with the code and modify values, and gain some understanding by observing the result of your changes. Often, we don't need to fully understand how code really function, or the underlying theory.
3. Prepare, and add to the repository, a journal.md file for logging your progress and choices.
3. design and implement your scene. Here, you can choose between different methods; it is a good exercise to try a couple of different alternatives (however, this is not mandatory)
	- design your scene on graphed paper, deriving, for each box, the necessary translation, rotation, and scaling values. Then, you can directly code the scene in three.js
	- prototype your scene in Unity. Placing, rotating, and scaling grey boxes is straightforward, as we showed in classroom. You can change the color
	or texture of a cube by: (i) creating a new material; (ii) assigning the material to the cube; (iii) changing, in the inspector, the material albedo color or texture. See the [Unity documentation for these operations](https://docs.unity3d.com/Manual/Materials.html). You can then reproduce the scene in three.js.
	- directly create your scene using the [three.js editor](https://threejs.org/editor/). In this case, you can use the "scene export" function to directly export the scene in the json-based three.js scene format. Once the result is saved as text file, it should be possible to load it into three.js using the (deprecated) SceneLoader or the new ObjectLoader. I write "it should be possible" because it is not entirely clear if and which of the two will work. So, in theory this solution requires the least amount of work; in practice, it will probably require you to dig into three.js code and maybe spend a few minutes googling for answers to problems. This is quite common with complex, continuously developed code such as three.js and game engines. You will always find bugs, poorly documented features or outdated examples. Learning how to cope with this situations, how to search and ask for help, e.g. on AnswerHub is an important skill than any developer should acquire.
4. design and implement an animation. Aim for simple animations that can be expressed by a few translations or rotations, or that can be programmed through simple mathematical relations or even physics equations (like Kinematic equations). You might need to introduce nodes (Object3D) in your scene graph to make the animations easier to implement. As with several examples that we have seen, you can make the animation user-controllable by using [dat.gui] (https://github.com/dataarts/dat.gui). Look in three.js examples for how to connect the GUI controls to your scene.
5. At this point, you need to choose whether to add a terrain or create a short movie. These alternative steps are explained below.
6. Create a report of your work.
7. On Monday 27th, I will download your repository and evaluate your work.

### Adding a terrain

The code in StartingCode-heightmap loads a greyscale image from a file and creates and array of the same m x n size of the image, where the value in each cell ranges from 1 (black) to 63,75 (white). 
Write a function that takes this array, and creates a grid of cubes on the XZ plane, where the scaling and translation in Y for each cube is proportional to the value read in the array, meaning that you should choose a proportionality factor that makes the terrain look good. In other words, you are treating the image as an **heightmap**, where the greyscale value corresponds to the height of the corresponding point. 

You can also choose the cube color or texture based on the heightmap value, e.g. white color for high values (snow), grey color for medium values (rocks), green color for lower values (grass), but this is just an example.

### Creating a short movie

Remove the code for orbiting the camera with the mouse and plan camera movements (e.g., pan, arcing, traveling) and cuts. In the Update function, using the Date.now() Javascript function (that returns the number of milliseconds elapsed since 1 January 1970 00:00:00 UTC) you can check how much time is passed since the application started and then activate the correct camera animation.

For producing the movie, you can use some screen capture application, and then, if you want, you can use video editing software to apply post effects, transitions, and color correction.	

## Documenting and report

For project documentation and reporting, we use the [markdown format](https://daringfireball.net/projects/markdown/syntax), which is also the format of this document. Markdown is a lightweight markup language with plain text formatting syntax which is easy and quick to write, very human-readable, and that can be converted to HTML.

If you need more features than the ones that markdown provides (e.g. writing equations), you can use one of its extensions called [markdeep](https://casual-effects.com/markdeep/). For this project, however, markdown shoud be enough.  

You are required to document your project in two ways:

- maintain a journal (in a file called journal.md) describing key design decisions, changes, bug symptoms and solutions, including screenshots.
- create a report (in the readme.md file).

The report should be as brief as possible while covering the following points:

- overall description: what your project is about and the files it uses.
- results, including images of the scenes created, taken in a way that clearly illustrates that they satisfy the specification.
- brief explanation of the process that you used to make your scene. Include tools, assets, and planning steps.

## Constraints

If you use textures, please make sure that you have the rights to include them. For example, search for images that come with a [CC Attribution, ShareAlike or NonCommercial licences](https://creativecommons.org/share-your-work/licensing-types-examples/). 

You are allowed to take inspiration, or create models that reproduce what you see in images on the internet, but copying others' work, even with slight modifications, is forbidden and will have serious consequences beyond the deletion of your project. In any case, mention any source of inspiration in your journal and final report.

## Follow-up

You are welcome to extend your project after the deadline, in any way your think is interesting. For example, you could add javascript libraries that analyze music and derive values in real-time that can be fed to three.js for animation purposes, or you could extend your terrain generation software such that hidden cube faces are not created in three.js. If you do that before the final exam, you might get bonus points for this kind of activies - just let me know any progress you make.

## Credits

This project is inspired by the [Cubes Graphics Codex Project](http://graphicscodex.com/projects/cubes/index.html) by Morgan McGuire.

If you like voxels, check out [this three.js-based project](http://voxeljs.com).

## Useful material and references

Sometimes, some feature of the Javascript language can be tricky: [a growing list of quirks](http://bonsaiden.github.io/JavaScript-Garden/)

