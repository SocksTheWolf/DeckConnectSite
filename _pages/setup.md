---
title: Getting Started
layout: bigsingle
excerpt: "A quick guide to using the DeckConnect plugins"
permalink: /setup
redirect_from: /getting-started
toc: true
class: splash
toc_label: "Table of Contents"
toc_icon: "cog"
read_time: true
classes: wide
page_css:
  - /assets/css/jekyll_img.css
  - /assets/css/setup.css
header:
  overlay_color: "#4182e4"
---

This guide assumes that you are familiar with installing Unreal Plugins as well as Elgato Stream Deck plugins from their respective marketplaces.

If not, the respective guides can be found here:

* {% href https://help.elgato.com/hc/en-us/articles/33589587352337-Elgato-Stream-Deck-Download-and-use-Plugins Installing Stream Deck Plugins %}
* {% href https://dev.epicgames.com/documentation/en-us/unreal-engine/working-with-plugins-in-unreal-engine#installingpluginsfromfab Installing Code Plugins from FAB %}

## Unreal Plugin Setup

These are the steps for setting up DeckConnect in Unreal, if you are not going to be editing nor creating actions in the Unreal Engine, you can skip down to the [Stream Deck Plugin Setup](#stream-deck-plugin-setup) section.

### Step 1: Open DeckConnect Settings

#### Open Project Settings

In the Editor, open up your `Project Settings` for your application.

{% img lazy src='/assets/images/setup/unreal/ProjectSettings.png' alt='Opening Project Settings' wrapper_class="center" size="halfsize" %}

#### Find DeckConnect settings under Plugins

In the window that appears, scroll down to the section that says `Plugins` and look for the entry that says `DeckConnect`.

{% img lazy src='/assets/images/setup/unreal/DeckConnectSettings.png' alt='Viewing DeckConnect Settings' wrapper_class="center" %}

### Step 2: Add a new Action

Once you have opened up the settings window, click the plus icon. This will create a new entry in your list.
{% img src='/assets/images/setup/unreal/NewAction.png' alt='Creating a new action' wrapper_class="center" %}

You will have the option to name the Action, as well as setting it's execution ruleset.  

Unique names are *heavily recommended* to make your actions easier to find.
{: .notice--primary}

If your action is going to run independently of any running game instance, you can check the `Run on Any Thread` option. However, the necessity to do so is rare.

### Step 3: Hook our new Action to an Event

**NOTE**: More in-depth information can be found on [the documentation page](/docs).
{: .notice--success}  

To quickly create an action within blueprint that fires whenever an user presses a button:  

1. Create a new Actor object in your current scene.
2. Open the EventGraph and right click somewhere to open the Blueprint Widget Finder.
3. Type in `DeckConnect` and choose the `Register DeckConnect Function` widget.  
{% img lazy src='/assets/images/setup/unreal/FindDeckNode.png' alt='Finding the DeckConnect Widget' wrapper_class="center" %}  

{:start="4"}
4. In the widget that appears, use the `Action Name` option to find the action you just created in the previous step.

{% img lazy src='/assets/images/setup/unreal/ActionNameList.png' alt='Action Name List' wrapper_class="center" size="halfsize" %}

{:start="5"}
5. On the action pin, drag the pin to create a New Node. In the menu that appears, click `Add Event` and then `Add Custom Event`.

{% img lazy src='/assets/images/setup/unreal/AddCustomEvent.png' alt='Adding a new Custom Event' wrapper_class="center" size="halfsize" %}  

{:start="6"}
6. You can set this up to perform any action you'd wish, but for the sake of simplicity, we'll have it print out a message on screen.  
&nbsp;  
Our final Blueprint looks like this:  

{% img lazy src='/assets/images/setup/unreal/Output.png' alt='Final Blueprint Graph' wrapper_class="center" size="75%" %}  

{:start="7"}
7. Now whenever the user presses the button, they'll will be pressented with the message "Hello"!  

{% img lazy src='/assets/images/setup/unreal/Result.png' alt='Output upon pressing button' wrapper_class="center" size="halfsize" %}  

To set up other types of events (like in C++), Multiple custom events can also be bound to the same DeckConnect action if you desire!

&nbsp;  

## Stream Deck Plugin Setup

This step requires that you have downloaded and installed the DeckConnect Plugin from [Elgato Marketplace](/deck). Once this prerequistite has completed, continue with the steps below.

### Step 1: Add a new Stream Deck Button

After installing the [Stream Deck Plugin](/deck), find the button category named `DeckConnect` in your plugin list. There should be an option named `DeckConnect Action`. Drag this item onto an empty Stream Deck button space.

{% img lazy src='/assets/images/setup/deck/CreateANewAction.png' alt='Creating a new Stream Deck button' wrapper_class="center" size="halfsize" %}

You may notice that you have no actions in your settings dropdown! You'll need to approve the DeckConnect instance first.
{: .notice--warning}

### Step 2: Instances

Actions, by default, do not immediately appear on the first time. DeckConnect uses a system called "Instances" to make sure that you can easily manage and categorize buttons from a variety of Unreal sources.

Once a DeckConnect source has been "approved", the buttons from that source will sync automatically.

#### Approving Instances

DeckConnect will show you all the instances of applications that:

* Currently running that have the Unreal DeckConnect plugin included.
* Any DeckConnect instances you've ever approved.

To approve an instance:

1. Run your Unreal Application that has DeckConnect.
2. Open the Stream Deck software
3. Choose a DeckConnect button.
4. Click on the `Instance Settings` link as seen below.  

**NOTE**: If DeckConnect detects an instance it hasn't seen before, a `(New!)` indicator will appear.
{: .notice--info}

{% img lazy src='/assets/images/setup/deck/InstanceSettings.png' alt='Highlighted box around Instance Settings' wrapper_class="center" size="halfsize" %}

{:start="5"}
5. On the page that appears, check the box next to the name of the Unreal application that's currently running.

#### Managing Instances

Instances can be managed using DeckConnect's `Instance Manager`.

Check the boxes of the application instances you want to work with, and uncheck any instances you don't.

{% img lazy src='/assets/images/setup/deck/InstanceManagement.png' alt='Managing Instances' wrapper_class="center" size="halfsize" %}

**NOTE**: DeckConnect will automatically remember any approved instances and will continue to work with those instances the next time it sees them.  
{: .notice--info}

Once you have managed your DeckConnect instances, click the back button to configure your button's action.

### Step 3: Button Settings

When you have enabled an instance, all of its DeckConnect actions will become immediately available to you! Just select an action from the dropdown to start using it immediately!

{% img lazy src='/assets/images/setup/deck/ActionListExample.png' alt='Actions List Example' wrapper_class="center" size="halfsize" class="rounded shadow" %}

When an instance is approved, you will automatically get any new/updated/removed actions from the instance in real time!

To create future Buttons on your Stream Deck, you can simply drag in a new `DeckConnect Action` and choose an action from the list.  
&nbsp;  
When you want to bring in buttons from another instance, just start the process from Step 2.
{: .notice--success}
