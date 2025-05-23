---
layout: bigsingle
toc: true
toc_sticky: true
toc_label: Contents
toc_icon: "cog"
title: Documentation
excerpt: "In-depth technical documentation on DeckConnect"
permalink: /docs
classes: docs
header:
  overlay_color: "#4182e4"
page_css:
  - /assets/css/jekyll_img.css
---

DeckConnect supports a variety of different delegate types to fire, from blueprint delegates, native delegates and just plain lambdas. If it can be coded (either via C++ or  blueprints), it can be used as a response to a DeckConnect Action.

This page assumes that you have already gone through [the Setup guide](/setup), as that covers around 90% of all use cases.

## Terminology

Throughout this document, you may see some new terms:

* `Button` - A physical button on a Stream Deck.
* `Action` - Definition data. Actions are created and maintained in Unreal DeckConnect plugin, they are assigned to buttons using the Stream Deck application.
* `GUID`/`Action GUID` - The internal indentifer for a given Action.
* `Name`/`Action Name` - Human readable string that can be used to find a given Action. It is marginally slower to query actions using this method, but not by much.

## Reference

### Getting access to the DeckConnect System

The main DeckConnect system can be referenced to in one of two ways:

**C++**:

```cpp
#include "DeckConnect.h"

UDeckConnectSubsystem* DeckConnect = FDeckConnect::Get();
```

**Blueprint**:

Look for the Blueprint Node `Get DeckConnectSubsystem` as seen below.

{% img lazy src='/assets/images/reference/GetDeckConnectSubsystem.png' alt='Getting the Subsystem' wrapper_class="center" size="halfsize" %}

---

### Getting DeckConnect Actions

While there is little to no need to enumerate DeckConnect Actions in most cases, you can still use the following functions to query Actions.

* [DoesActionExist](#doesactionexist)
* [GetGuidForName](#getguidforname)
* [GetNameForGuid](#getnameforguid)

---

### Registering a function to an Action

**C++**:

In C++, there are a variety of different register functions that can be used so long as you know either the `Action Guid` or the `Action Name`.

Native has two different forms of the `Register` function:  

1. Takes an `FDeckActionDelegate`
2. Takes a raw lambda/functor with the signature `void(void)`

All register commands return a `FDeckActionDelegateHandle` handle to the registered function for the Action.  
Unless you are binding raw lambdas (i.e. not using delegates) in game code, you usually do not need to store/use the return value.
{: .notice--danger}

```cpp
#include "DeckConnect.h"

if (UDeckConnectSubsystem* dc = FDeckConnect::Get()) {

  FDeckActionDelegateHandle Handle = dc->Register(FName(TEXT("Example")), [this]() {
    /* Some code to fire when the Button is pressed */
  });

  dc->Register(FGuid(...), 
    FDeckActionDelegate::CreateUObject(this, &AClass::OnActionCallback));
}
```

**Blueprint**:

Registering is provided via a widget called `Register DeckConnect Function`, this list will always automatically be updated, no need to do anything more.  

A more advanced option if you already know the internal GUID of an Action, is to use `Register DeckConnect Function By GUID` blueprint node. It's not advised as there's more room for potential error, but it is imperceptibly faster to use.

{% img lazy src='/assets/images/reference/RegisterFunction.png' alt='Registering Functions' wrapper_class="center" size="halfsize" %}

---

## Functions

### FDeckConnect

A simple forwarding class that allows you to get direct access to DeckConnect with minimal extra code.

---

#### Get

Gets the DeckConnectSubsystem, returned as a pointer to `UDeckConnectSubsystem`.

**C++**:

```cpp
#include "DeckConnect.h"

UDeckConnectSubsystem* DeckConnect = FDeckConnect::Get();
```

**Blueprint**:

See the information [in this section](#getting-access-to-the-deckconnect-system).

---

#### LaunchDownload

Launches a link to the Elgato Marketplace so the user can download the free Stream Deck plugin.

**C++**:

```cpp
#include "DeckConnect.h"
FDeckConnect::LaunchDownload();
```

**Blueprint**:

{% img lazy src='/assets/images/reference/PluginDownloadWidget.png' wrapper_class="center" alt='Search for DeckConnect to find this faster' size="75%" %}

---

### UDeckConnectSubsystem

This is the bread and butter of the entire system, and how you can directly interface with information.

---

#### Connect

Connects to the Stream Deck at the given address location. Does nothing if already connected. If no address is passed, it will use the connection address from the project settings.

**NOTE**: By default, DeckConnect will autoconnect to the address in your settings. You can disable this functionality by unchecking the setting `Connect On Start` in the options.
{: .notice--info}

**C++**:

```cpp
#include "DeckConnect.h"
if (UDeckConnectSubsystem* DeckConnect = FDeckConnect::Get()) {
  /* Connect to a specific URL */
  DeckConnect->Connect(TEXT("ws://127.0.0.1:32420"));
  /* Connect to the default settings location */
  DeckConnect->Connect();
}
```

**Blueprint**:

{% img lazy src='/assets/images/reference/Connect.png' alt='Calling Connect to Stream Deck' wrapper_class="center" size="75%" %}

---

#### Disconnect

Disconnects the system to the current connection. Does nothing if not already connected.

**C++**:

```cpp
#include "DeckConnect.h"
if (UDeckConnectSubsystem* DeckConnect = FDeckConnect::Get()) {
  /* Disconnect from whatever we are connected to */
  DeckConnect->Disconnect();
}
```

**Blueprint**:

{% img lazy src='/assets/images/reference/Disconnect.png' alt='Calling Disconnect to Stream Deck' wrapper_class="center" size="75%" %}

---

#### IsConnected

Returns if we are currently connected or not to a StreamDeck.

**C++**:

```cpp
#include "DeckConnect.h"
if (UDeckConnectSubsystem* DeckConnect = FDeckConnect::Get()) {
  UE_LOG(LogTemp, Log, TEXT("We are currently %s!"), 
    (DeckConnect->IsConnected() ? TEXT("Connected") : 
    TEXT("Disconnected")));
}
```

**Blueprint**:

{% img lazy src='/assets/images/reference/IsConnected.png' alt='Calling IsConnected to Stream Deck' wrapper_class="center" size="75%" %}

---

#### Register

Register allows you to register based on Action Name or on Action GUID a callback. When the Stream Deck sends over a command, all valid registered callbacks will fire.

In C++ and in Blueprint, this will give you a delegate handle object called `FDeckActionDelegateHandle`, you can use this to unregister delegates.

For Blueprint, there is no direct necessity to explicitly unregister delegates, these will be done when the world exits.
{: .notice--info}

See [here for examples](#registering-a-function-to-an-action).

---

#### Unregister

Unregister allows you to unbind actions that you have bound to DeckConnect at any time.  

This is really only useful for C++, as Blueprints will automatically unregister on detection of the owning object no longer existing. However, this function is provided for completion sake.
{: .notice--info}

**C++**:

```cpp
#include "DeckConnect.h"
if (UDeckConnectSubsystem* DeckConnect = FDeckConnect::Get()) {
  FDeckActionDelegateHandle Handle = DeckConnect->Register(FName(TEXT("Example")), [](){
    /* Code to execute */
  });
  /* When called, Handle will become invalidated. 
     On pressing the button tied to "Example" Action, 
     this function will not fire. 
  */
  DeckConnect->Unregister(Handle);
}
```

---

#### IsDelegateHandleValid

Check to see if the given delegate handle is still valid. Returns true if the handle points to a bound object, false otherwise.

This is really only useful for C++, as Blueprints will automatically unregister on detection of the owning object no longer existing. However, this function is provided for completion sake.
{: .notice--info}

**C++**:

```cpp
#include "DeckConnect.h"
if (UDeckConnectSubsystem* DeckConnect = FDeckConnect::Get()) {
  FDeckActionDelegateHandle Handle = DeckConnect->Register(FName(TEXT("Example")), [](){
    /* Code to execute */
  });
  if (DeckConnect->IsDelegateHandleValid(Handle))
  {
    UE_LOG(LogTemp, Log, TEXT("Action has a bound function!"));
  }
}
```

---

#### GetGuidForName

Returns the Action GUID for the given name. If it doesn't exist, an "Invalid" GUID will be returned that contains all values as zero.

**C++**:

```cpp
#include "DeckConnect.h"
if (UDeckConnectSubsystem* DeckConnect = FDeckConnect::Get()) {
  FGuid ActionGuid = DeckConnect->GetGuidForName(FName(TEXT("Example")));
  if (ActionGuid.IsValid()) {
    /* ... */
  }
}
```

**Blueprint**:

Use the `Get GUID for Name` node like below. Make sure to check the validity of the return value.

{% img lazy src='/assets/images/reference/GetGUIDForName.png' alt='Getting an Action GUID for the given Name' wrapper_class="center" size="75%" %}

---

#### GetNameForGuid

Returns the Action Name for the given GUID. If it doesn't exist or is an "Invalid" GUID, `NAME_None` will be returned.

**C++**:

```cpp
#include "DeckConnect.h"
if (UDeckConnectSubsystem* DeckConnect = FDeckConnect::Get()) {
  FName ActionName = DeckConnect->GetNameForGuid(FGuid(...));
  /* Check that this is not the None Name */
  if (!ActionName.IsNone()) {
    /* ... */
  }
}
```

**Blueprint**:

Use the `Get Name for GUID` node. Checking for `NAME_None` is a little wacky, so it's advised to call [DoesActionExist](#doesactionexist) first.

{% img lazy src='/assets/images/reference/GetNameForGUID.png' alt='Getting an Action Name for the given GUID' wrapper_class="center" size="75%" %}

---

#### DoesActionExist

Returns true if the given `FName` or Action GUID (`FGuid`) is tied to a valid, known Action.  

You do not need to call this if you got a valid result from `GetNameForGuid` or `GetGuidForName`.
{: .notice--warning}

**C++**:

```cpp
#include "DeckConnect.h"
if (UDeckConnectSubsystem* DeckConnect = FDeckConnect::Get()) {
  const bool GUIDResult = DeckConnect->DoesActionExist(FGuid(...));
  const bool NameResult = DeckConnect->DoesActionExist(FName(TEXT("Example")));
  if (GUIDResult && NameResult) {
    /* ... */
  }
}
```

**Blueprint**:

Both methods are also accessible from Blueprint.

{% img lazy src='/assets/images/reference/DoesActionExist.png' alt='Getting if an Action exists' wrapper_class="center" size="75%" %}

---

## Closing

This document was way too long. Thanks for getting this far, I hope it helped you.  

If you have any feedback, please feel free to [send a message via the contact form](/contact).

### Known Issues

---

#### Unreal

* Copy/Pasting Data values other than Name in the DeckConnect settings window does nothing. This is intentional to prevent disasterous data loss. If you want to share actions, copy and paste the actions from the config file instead.

#### Elgato

* The port that DeckConnect uses cannot be easily changed.

---

### More Resources

You can find additional information here as well:

* [Updates & Changes](/updates)
* [Usage Tips](/tips)
* [Examples](/examples)
