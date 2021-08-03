# MIMIR & FREYJA
☠ The Wise Localflix ☠

![FUCK YEA](gifs/mimir1.gif)

## What the ????
The main intent of this project was to learn how could I possibly use PANDORA as a usefull thing on the weekends. Obviously the correct answer was: BUILD A LOCAL STREAMING PLATFORM to watch my old movies anywhere in my local network.

Basically it creates an web-app that listens to the folder served by Pandora and shows the source in the same format as netflix. 

![FUCK YEA](gifs/mimir2.gif)

## Tech
* Plain Vanilla Javascript (because fuck you libraries)
* Netflix inspired layout and usability
* Feather Icons

## How it works
* Gonna need a local network / server to run it
* And since we dont have a database yet (and probably would never have), you gonna need to implement and hardcode the videos that you want to watch.

## Funcionality
- [x] Open and watch video file with native encoding

- [x] Simple menu with all the sources

- [x] Fasf forward & rewind KINDA OF

- [ ] save the current time to watch more later

- [x] encapsulate all the main files in only one place

- [ ] subtitle load
- [x] basic server to run
- [ ] maybe a simple functional login

#### Bundled with PANDORA
Now MIMIR cames with PANDORA to run and test/watch your videos.
Beware, you gonna need Python3.x.

Its gonna run on ```localhost:8040``` unless changed in Pandora.

#### Bugs
* main page have some misaligned items and the image doesnt cover the whole box
* Subtitles are loaded but not styled or showed/rendered
* FF and Rewind are messy and sometimes lags and or aren't even executed properly
* Mobile view is cluttered