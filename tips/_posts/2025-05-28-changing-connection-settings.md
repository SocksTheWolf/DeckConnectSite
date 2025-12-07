---
title: Changing Connection Settings
date: 2025-05-28 20:30 -0700
excerpt: How to change DeckConnect's Connection Settings
tags:
  - Unreal
  - Elgato
inline_page_css:
  - /assets/css/jekyll_img.css
---

By default, DeckConnect communicates over port `32420`, however this port value can be changed. In this document, we'll go over how to do so.

## Stream Deck Settings

In the Stream Deck settings page, there's an option for "Global Settings" (if you do not see this value, make sure you have updated!)

{% img lazy style="max-width: 563px" src='/assets/images/changingports/DeckConnectSettings.png' alt='DeckConnect Stream Deck Settings' wrapper_class="center" %}

---

Clicking that option will bring you to the Global Settings page:

{% img lazy style="max-width: 563px" src='/assets/images/changingports/SettingsOptions.png' alt='Settings Options' wrapper_class="center" %}

1. `Server Port` - This will automatically populate with whatever your current port value is upon loading into the settings page
2. `Set and Restart` - Whenever you change the value of the port, it does not apply immediately, you must click this button to restart DeckConnect.
3. `Reset to Default` - This will set the port value to `32420`, apply and restart the server instantly.

---

Typing values into the port field will change the icon on the right side based on if the data is valid or not. If it's not valid, you'll see a tiny `!` or a check mark if it is valid.

Upon hitting `Set and Restart`, a DeckConnect restart message will appear.

{% img lazy style="max-width: 383px" src='/assets/images/changingports/ServerRestartFail.png' alt='Server Restart Message' wrapper_class="center" %}

This message will either say `Success` or `Fail` based on if the setting could be saved and the server restarting successfully.

If the setting didn't change from what it was originally, then the server will fail to restart (because it doesn't need to restart, so it won't).
{: .notice--warning}

## Unreal Plugin Settings

The Unreal Plugin is a bit more straight-forward, as in 99% of the cases, you only need to update the port setting and DeckConnect will take care of it for you. Open Plugin settings for DeckConnect (found in Project Settings) and scroll all the way down to the `Connection` section of the settings.

{% img lazy style="max-width: 500px" src='/assets/images/changingports/UnrealConnectionSettings.png' alt='Unreal Connection Settings for DeckConnect' wrapper_class="center" %}
You can leave the IP address as `127.0.0.1` (the default) unless you are working with machines across the network (like I am in the screenshot above).
{: .notice--warning}

In the text box for `IP and Port` you can change the value of the port you want to connect to with DeckConnect. Upon clicking away, pressing Enter or restarting, DeckConnect will automatically attempt to connect to that address and port for you.
