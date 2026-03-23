# OpenStageControl-Headtracker-Translator
Open Stage Control custom module scripts to translate incoming OSC messages into common binaural headtracking OSC formats.

Currently, there is only one script, one to translate quat data from the [Data OSC](https://apps.apple.com/us/app/data-osc/id6447833736) iOS app into standard Virtuoso APL format. However, Open Stage Control can theoretically be used to fairly easily translate any OSC data into any other OSC data, including to and from different headtracker formats, headtracking apps, opentrack, etc. 

This format was simply chosen as a first-attempt solution due to the ease of access of all applications involved. Reasoning is below:

**Virtuoso** is (one of) the only binauralization apps on PC that supports headtracking at a relatively low latency (nearly usable for real time use-cases such as gaming).

**Data OSC** is the only (free) iOS headtracking app that output OSC. Alternatives such as the multiple OpenTrack iOS apps are paid and OpenTrack's OSC module outputs in a random format, which would still require a translator. All translator apps were either out of commision (AIFaceTrack), didn't work with Virtuoso (NVSonic Bridge), or were paid (OpenTrackNoIR). Plus the added latency and performance overhead of having the calculations done on device were relatively significant. In comparison, Data OSC (for better and worse) does all processing, tracking, and filtering (or lack thereof) on device. The accuracy and versatility of the iPhone's IR dot matrix projector is also a huge boon for tracking accuracy and overall ease of use, requiring no calibration or recentering for accurate use, with the only limitation being the distance and field of view of the actual IR projector.

**Open Stage Control** was chosen as an easy to use OSC reciever/controller GUI. Unfortunately, the lack of support for native translations indicated a necessity for a custom "module" or script to translate the values and set output addresses.

## Prerequisites
_Currently required only for the current script, future variations may have different prerequisite requirements._
- [Data OSC](https://apps.apple.com/us/app/data-osc/id6447833736)
- [Open Stage Control](https://openstagecontrol.ammd.net/)
- Virtuoso APL _(tested with Standalone Windows app, presumably works with the plugin or any other version_

## Setup
**Data OSC**
- Open Data OSC iOS app.
- Enable "OSC" and set your computer's local IP address (type `ipconfig` in cmd).
- Set any port you want (I used `8080`).
Example:
<img width="345" height="1098" alt="Data OSC example 1" src="https://github.com/user-attachments/assets/518f8094-b09e-4b61-b9e1-99b285851764" />
- Scroll down and enable "Face Tracking", click on the icon to change the settings and disable everything but Face Tracking > Face > Rotation > x, y, z, w
Example:
<img width="345" height="1098" alt="Data OSC example 2" src="https://github.com/user-attachments/assets/d674df62-6b99-432e-8280-1935307caa35" />
_Note:_ The iOS SDK takes care of all "calibration", sensitivity, and centering for the FaceID camera automatically, so you may leave the Data OSC app, pause/resume the output, or lose and reconnect tracking at will with any position, without worrying about recalibration. You may also keep your phone at any position or angle as well as very low light, as long as the dot matrix combo can recognize your face it will recalibrate automatically. You may even move the phone while your moving your head and still send accurate tracking data! 

**Open Stage Control**
- Open `open-stage-control.exe`
- Set the "port" value to the same as you set above.
- Set "send" to `localhost:3001` (or the IP of whichever computer you wish to send to).
  _Note: I think Virtuoso's default port is 3001, but correct me if i'm wrong. If you change this, the send port also needs to be configured in the script_
- Set "custom-module" to the script you have downloaded.
Example:
<img width="1299" height="260" alt="image" src="https://github.com/user-attachments/assets/cca6ef1a-f96c-4392-bf05-6297a5a8b41f" />
- Press the play button (top left corner)

If the module is loaded correctly, you should see `INIT: module loaded` just above the "(INFO)" message in the console.
Optionally, you may now enable "no-gui" to disable the widget window popup.
You may also set the application settings, such as minimize to tray or open on startup.

If you are having issue with the app's output, you may also enable "debug" to view all messages that is being recieved on the port. If the app is sending data you will recieve a live feed in the console. It is recommended to disable this normally for performance purposes.

In Virtuoso, change head tracking to "Auto" and make sure the port is 3001. Do not change the message format from "APL".
Example:
<img width="152" height="137" alt="image" src="https://github.com/user-attachments/assets/c4dd2d54-6255-4e26-8b4a-bf1f150b157f" />

## Limitations
- Slightly higher latency then what is desired.
- No 360 tracking (uses face).
- To actually recenter (e.g. when changing workstations, computers, or moving locations) the app needs to be closed and re-opened. This is because the ARKit face tracking uses the gyrometer of the phone and starting face position to determine the "true forward" on tracking initialization, resulting in an incredibly accurate tracking without calibration or recentering (even going as far as to still have accurate tracking when rotating 360 degrees while keeping the phone perfectly on front of your face!), but also resulting in inflexibility.

## To-Do
- Add more message output formats (I currently only use Virtuoso)
- Add smoothing between the input and output stage
- Add centering between the input and output stage
- Add sensitivity adjustments between the input and output stage
- Add yaw pitch roll input/output variations

## Modifications
The script is very easily modified to any format you wish.

The port `3001` can be changed to anything, as long as it matches the send port in the Open Stage Control GUI. The send address can be changed from `/Virtuoso/quat` to any other address. Other format conversions and calculations will require more in-depth changes and testing, as the current version of the script is personalized to the Data OSC app's quat output, with manual trial and error to determine the correct quat input to output conversion. 
