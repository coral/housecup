extv-casters
============

Display a bar at the bottom of the screen with two names (used for commentators)

##Demo
A demo video can be seen [here](http://youtu.be/3dp8PSSFuVE).

##Installation
- Install [NodeCG](https://github.com/nodecg/nodecg)
- Install extv-casters to `nodecg/bundles/extv-casters`

##Usage
- Run NodeCG
- Navigate to the NodeCG dashboard at `http://localhost:9090/`
 - If you set a different hostname/port in NodeCG's configuration, use those instead
- Add the view URL as a [Browser Source](https://obsproject.com/forum/resources/clr-browser-source-plugin.22/) layer in [OBS](https://obsproject.com/).
 - Technically, any signal flow that can render a webpage with webkit is suitable, but this graphic was developed and tested against OBS.
 - The view URL can be found by clicking the blue and white `i` button at the top of this bundle's control panel in the dashboard.
- Preview/stream your scene in OBS
- Use the dashboard to control the graphic

##Credits
- Visuals based on [Broadcast Design Sport ID](http://videohive.net/item/broadcast-design-sport-id/4670588) by [Balistique](http://videohive.net/user/Balistique?WT.ac=item_profile_text&WT.z_author=Balistique)
- Audio design by [Anthony "Airon" Oetzmann](http://aironaudio.weebly.com/)
