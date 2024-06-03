# Terminal Emulation and Simulation

In this blog post we will see how emulate and simulate an terminal with plan JavaScript and CSS.
Why you want to do that, you may ask? The main reason is by emulating a terminal you will learn how,
terminal work. so key idea such as input buffer, history buffer and even work diconary TREE.

## Content

-   What is a Terminal emulation.
-   What is a Terminal simulation.
-   How this project is constracted.
-   Define Screen class and his methods.
-   Define Terminal class and his methods.
-   Define Terminal Input class and his methods.

## Terminal

## How this project is constracted

This project will use OOP, to make it simple to understand and later to expend if wanted.
The main class will be the Terminal class, this class will be responsible for the terminal and have this propeties:

-   Termianl screen: This object will be use to manipulate the terminal screen, base on input. for example "splie" will split the screen to two saprated screen. (will be implemented this first)
-   Terminal input: This object will handle input strings and call the relevant method.
-   TreminalKeywords: This is a small object that use to fins keyword and can add keyword.

## Simulation of Terminal

The idea of simulation of treminal is the GUI of the treminal and how to display informaion and how to handle input.
This mean we will create our own terminal GUI and handle input, and define in css files how we want to display the terminal.
first we will use simple HTML element and later own make our own element so we can code it like this.

```HTML
    <Terminal >
        <TerminalScreen>
        <TerminalScreen/>
    <Terminal/>
```

## Screen

At the start we will work with this screen HTML element structur.

```HTML
<div id="Termianl">
    <div id="TerminalScreen">
        <ul id="TerminalOutput">

        </ul>
        <input type="text" value="> " id="TerminalInput" />
    </div>
</div>
```

As you can see the `div` "Termianl" will hold the whole Terminal, and the `div` "TerminalScreen" be our main screen, later we can add more screens.
the `ul` we hold our lineOut to the screen as a list of all output.
Note : we need to consider what happend if line will be added to the screen and the screen will be to long to display all the line. We will solve it with a 'display window' that shift back and forth with scrolling.
