---
layout: bigsingle
classes: wide
toc: true
toc_sticky: true
toc_label: Table of Contents
title: Documentation
excerpt: "In depth technical information on DeckConnect and using it in a project"
permalink: /docs
classes: docs
page_css:
  - /assets/css/jekyll_img.css
---

DeckConnect supports a variety of different delegate types to fire, from blueprint delegates, native delegates and just plain lambdas, if you have a function, you can call it as a response to a DeckConnect Action.

This page assumes that you have already gone through [the Setup guide](/setup), as that covers about 90% of all users.

## Terminology

Throughout this document, you may see some new terms:

* `Action` - Definition data that is tied directly to a button action on a Stream Deck. Actions are created and maintained in Unreal, they are assigned in the Stream Deck application.
* `GUID`/`Action GUID` - The internal indentifer for a given Action.
* `Name`/`Action Name` - Human readable string that can be used to find a given Action. It is marginally slower to query based off this, but not by much.

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
Both Delegates and Lambdas can be registered via the various functions.

The delegate used in C++ is `FDeckActionDelegate`.

```cpp
#include "DeckConnect.h"

if (UDeckConnectSubsystem* dc = FDeckConnect::Get()) {

  dc->Register(FName(TEXT("Example")), [this]() {
    // Some code to fire when the call is executed
  });

  dc->Register(FGuid(...), 
    FDeckActionDelegate::CreateUObject(this, &AClass::OnActionCallback));
}
```

**Blueprint**:

Registering is provided via a widget called `Register DeckConnect Function`, this list will always automatically be updated, no need to do anything more.  

A more advanced option if you already know the internal GUID of an Action, is to use `Register DeckConnect Function By GUID` blueprint node. It's not advised as there's more room for potential error by doing so, but it is slightly faster to do so.

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

**C++**:

```cpp
#include "DeckConnect.h"
if (UDeckConnectSubsystem* DeckConnect = FDeckConnect::Get()) {
  // Connect to a specific URL
  DeckConnect->Connect(TEXT("ws://127.0.0.1:32420"));
  // Connect to the default settings location
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
  // Disconnect from whatever we are connected to
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

See [here for examples](#registering-a-function-to-an-action).

---

#### GetGuidForName

Returns the Action GUID for the given name. If it doesn't exist, an "Invalid" GUID will be returned that contains all values as zero.

**C++**:

```cpp
#include "DeckConnect.h"
if (UDeckConnectSubsystem* DeckConnect = FDeckConnect::Get()) {
  FGuid ActionGuid = DeckConnect->GetGuidForName(FName(TEXT("Example")));
  if (ActionGuid.IsValid()) {
    // ...
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
  // Check that this is not the None Name
  if (!ActionName.IsNone()) {
    // ...
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
    // ...
  }
}
```

**Blueprint**:

Both methods are also accessible from Blueprint.

{% img lazy src='/assets/images/reference/DoesActionExist.png' alt='Getting if an Action exists' wrapper_class="center" size="75%" %}

---

## Closing

This document was way too long. Thanks for getting this far, I hope it helped you. If you have any feedback on this document, please feel free to [send a message via the contact form](/contact).

### Known Issues

---

#### Unreal

* Copying/Pasting entire DeckConnect Actions in the settings is not supported.
* Clearing the DeckConnect Action Settings is not supported.
* Currently, there is no way to _explicitly_ unbind a callback. Callbacks are automatically unbound when the world is destroyed after GC.
* Unreal native land code needs testing.

#### Elgato

No Known Issues.

---

### More Resources

You can find additional information here as well:

* [Updates & Changes](/updates)
* [Examples](/examples)
