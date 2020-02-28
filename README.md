# 301-speakeasy
A space for our final Code Fellows 301 group project!

### Team Members
* Kai Hansen
* Kory Jackson
* Daniel Nguyen
* Brett Packard
* Thomas Sherer

## Project Summary

Our original plan for this project was to build an app to help folks plan a cocktail party. We wanted a way for a host to coordinate drinks and ingredients with a chosen list of guests. Those guests would be able to view a list of drinks and related ingredients and note which of those they would be contributing to the party. After iterating through user flows and getting into the data structures, we had to downsize the scope of our app. It now allows the host to build event information, tie that event to a list of guests, and build a list of drinks for that event. The final product is a public view that the host can share with their guests. It is now more of an informational party-builder rather than a cooperative party-builder.

The API we are using is [The Cocktail DB.](https://www.thecocktaildb.com)

## User Flow

### User View

Here the user can enter a name. That name is a foreign key for all other data tables. So event, guest, and menu data will all be tied to that specific user. A new user will have a fresh data set displayed.

<img src="https://github.com/Speakeasy-2020/301-speakeasy/blob/master/img.readme/User%20View.png" width="500">

### Event View

The event view captures Name, Date, Time, Location (as a string), and Event Description (as a string). All fields are required to move onto the next page. The date and time entities took quite a bit of manual backend work. Those features work best on Chrome and do not work on Safari.

<img src="https://github.com/Speakeasy-2020/301-speakeasy/blob/master/img.readme/Event%20View.png" width="500">
 
### Guest View

This view allows the host to add and delete a list of guests. The host is automatically added to this list by default. This was a necessary workaround as the page rendering function requires data in the database in order to run correctly. So we plopped the user in there as a guest in order to make that function run upon initial page load for a new user.

<img src="https://github.com/Speakeasy-2020/301-speakeasy/blob/master/img.readme/Guest%20View.png" width="500">

### Menu View

This view allows the user to search for a drink, add the drink to a saved menu, and display that saved menu on a static page. This was our most complicated page by far. And for most of the project, all of those functions happened on the same page. Only late into the project did we create a distinct search results page. This allowed us to save some real estate as we did not have to display search results and a saved menu within the same space.

<img src="https://github.com/Speakeasy-2020/301-speakeasy/blob/master/img.readme/Menu%20Render.png" width="500">

### Public View

This view displays all the gathered information from the previous pages. It was originally intended to allow guest-input such that the host can share the page to guests and guests can mark themselves as Attending + also mark that they will bring ingredients for particular drinks. You can see the framework for that functionality in our schema.sql. However, as we got deeper into the project, we realized that we did not have time to fully implement these features. Perhaps if we had another few days!

<img src="https://github.com/Speakeasy-2020/301-speakeasy/blob/master/img.readme/Public%20View.png" width="500">

### [Deployed Site](http://speakeasy301.herokuapp.com)

### [Project Board](https://github.com/Speakeasy-2020/301-speakeasy/projects/1)

## Wireframes
[DrawIO link](https://drive.google.com/file/d/1m-pou0d5mqEFRaVxVLnmE693JFPeopVm/view?usp=sharing)

![wireframes](img.readme/301-speakeasy-project-Wireframes-3.jpg)

## Domain Model

![domain model](img.readme/301-speakeasy-project-DomainModel-2.jpg)

## Team Agreement

**Communication plan:** Communication will primarily take place on Slack. If for whatever reason it is not possible to communicate through Slack, texting will be the backup option. If anything regarding the project requires a decision, it belongs in the group slack rather than in private messages between individuals. Team members all agree to message the PM from the previous day before class about the status of what they accomplished so the PM can adequately prepare for stand-ups. 

**Conflict plan:** The team agrees to solve conflict between people at the lowest level first if possible. If things escalate, the team agrees to involve a mediator, most likely another team member, to help resolve the conflict. When it comes to conflicts about tasks themselves, we agree to pursue what we can accomplish as well and as quickly as we can without compromising quality. 

**Work plan:** We plan to utilize GitHub Projects for planning and organizing tasks. People are columns. We will start sessions with sunrise. PMs should identify fallout. If someone is working on their strength, they should involve someone in the process that needs to strengthen their skills in that area. The ReadMe belongs to Daniel. 

**Git process:** The GIT flow is that the Master branch is gold but PROD is God. To push to PROD, 3 people must approve the merge request, but ONLY after they each fully test the code and make sure it is functioning properly. To push to Master, 3 people must approve the merge request. Testing is not necessary. The naming system is as follows:

PROD - version X.x.x

Master - version x.X.x

Working - version x.x.X

**Any thing else you feel is important:** Unless necessary during the last several days before final presentations, there are no expectations to complete work on the project aside from the assigned meeting times. The team agrees to try to finish the projects a day before presentations so there is adequate time to prepare for the presentations themselves. The team also understands that the time frames for expected responses on Slack will be between 5pm-10pm on Mondays-Fridays and between 7am-10pm on Saturdays and Sundays.

## Change Log

### Day 1 // 2020.02.17

**8:30pm:** We got a late start to discussion around project stuff. Spent 1 hour building out basic rules and guidelines for the group, independent of the actual project.

### Day 2 // 2020.02.18

**6:30pm:** We all met in a conference room to brainstorm ideas. We had several directions to take. Looks like the top contenders are an Adult Beverage App and a Text Analysis App. Took us about an hour to get to those after discussing pros/cons for our other ideas.

**7:45pm:** We have started putting together the skeleton of our project setup tasks. Going through and trying to refine our ideas such that they are formatted correctly to turn in project prep assignments.

**8:35pm:** We successfully pitched the food/drink app to John. He suggested that we reorient it to focus on party/potluck organizing. 

**8:55pm:** We settled on the team name Speakeasy! Setting up repo stuff now.

**9:10pm:** Project prep 1 and 2 are in. #3 being worked now. Now looking at doing #4.

### Day 3 // 2020.02.19

**6:30pm:** We have assembled and the tasks for the day are to get the DOM model and wireframes figured out. If we can get those two things really polished, then that should set us up nicely for the rest of the project. Even better if we actually get to coding. Kory unfortunately talked to his doctor and was told to stay home for another couple days. Hopefully he is feeling better by Saturday. We will loop him into our decision-making and jump on a conference call if he's feeling well enough.

**8:30pm:** We have iterated heavily on the wireframes and data flows. In this process, we have downsized lots of features in order to make MVP on time. Right now we are trying to figure out the data structure for all the different data objects we will be working with. This is proving to be much more complex than we thought it would be initially. Definitely getting into the weeds on this. We will have to build wireframes and domain model in another session.

**9:00pm:** We spoke to Cory and Leo. They helped us visualize the way we will need to structure the data. We will need to make many different SQL tables. Turns out this will be much more complicated than we thought. Brett and Thomas are trying to get something barebones deployed so we can at least have something living out there. Daniel has added our domain model and wireframes to a basic draw.io template. He will try to get those fleshed out before we meet for tomorrow’s session. Then we can begin proper coding.

### Day 4 // 2020.02.20

**5:00pm:** Got to class early to work on the wireframes. 

**6:20pm:** Wireframes have been added to the readme.

**6:30pm:** Starting work on domain modeling. Hoping we can get base page structures built out tonight. Get views set up. Get them linked to each other etc. As well as getting domain model built.

**6:45pm:** Got the team together. Daniel is building out domain model. Brett is working on data schema for SQL tables. Kai and Thomas are building out scaffolding for basic page/route building. Kory is at home and is looking into the APIs to get a better idea of how we can pull from those.

**8:15pm:** John came in for standup. He suggested that we cut out some features. Rather than incorporate ingredients and amounts, we will simply focus on drinks as the only items. That cuts out lots of the complications for us. So we are gonna pivot to that direction.

**9:15pm:** We are still working on building out domain model and schema after John’s redirection. We stood up and worked out more flow ideas. We will be getting rid of the ingredients page and will also be redoing how the Menu Builder page will work. Lots of moving parts here. Still very little code written. We are going to try and do some catchup work at home regarding domain model, data schema, and page scaffolding. That way we can really get into coding on Saturday. Kory should be here as well as he's feeling better. 

### Day 5 // 2020.02.22

**9:00am:** The team is here. Kory is feeling better. Getting project board set up. Trying to figure out all the tasks we need to get figured out.

**10:00am:** Got files restructured. Getting routes built out. Kai researched background imagery. 

**11:00am:** Had some issues getting server.js working after restructure. Kory refactored a bunch of things. Brett has data schema built out. Kory’s server fixed pushed to master. Working through merge conflicts.

**11:20am:** Server issues resolved. Now we can work on the pages. Got all page CSS working. Got nav bar working on all pages. Breaking for lunch soon.

**1:15pm:** Coming back from lunch. Kory will work on Menu Builder page calls - to get the search results populating drink data to page. Kai working on CSS. Brett working on data schema integration.

**3:00pm:** Brett finished data structuring. Pushed to master. Dan and Thomas got button flows going. Kory and Kai working on CSS of forms. 

**4:00pm:** Got user data moving from home page. Got a bunch of CSS figured out. Things are moving quickly now. Feels good. Still lots of work to do.

**5:00pm:** Got event data flowing. Talking about how to dial in nuances for menu builder page. 

**6:00pm:** Still trying to get guest data flowing. Hit blockers getting menu data flowing. We are all tired and beat so gonna head home to rest up and try more another day. But lots of good progress happened today. 

### Day 6 // 2020.02.24

**6:30pm:** We are all here. Brett got our event function and page working well. Data posts to public view. We still need to get work done on guest page data flow and menu page data flow.

**7:10pm:** We merged everything together so master branch is up to date.

**9:30pm:** Tonight we got the guest view data flowing and info showing to the page. We got the menu view data (mostly) flowing and info showing to the page. We are very close to MVP. Tomorrow we will need to get the menu view delete and save to database functions going. Then we need to get the public view showing the guest and menu data. That will be MVP. 

### Day 7 // 2020.02.25

**6:30pm:** We are mob programming to figure out the menu page data flow.

**7:20pm:** We made lots of great progress on the Menu page. Data is rendering. We can save to database. It displays on the saved section. We added delete buttons. We created a discrete Search results page. But then we tried to merge it all and hit a critical merge conflict. It broke some code from just now to last night. We are trying to work through the issues right now. 

**8:20pm:** Finally fixed all the weird merge conflicts. In the process of merging to master to bring it all back to normal.

**9:00pm:** Master is looking good. We successfully fixed stuff and have merged Kai’s CSS changes to master. Currently getting the user-specific data changes worked out with Brett’s guidance. This should take us to MVP tonight. 

**9:30pm:** We went down the rabbit hole trying to get our menu data to be user-specific. We weren’t able to figure it out tonight but Brett will put in work before tomorrow to get it working.

### Day 8 // 2020.02.26

**6:30pm:** Checking in to start. Menu data is passing with user data attached. Guest list data is passing as well. We need to get the event data figured out tonight in order to hit MVP. Edit: we got it!

**6:45pm:** We are all here. Getting Kai’s CSS updates merged to master. Also getting the site deployed to Heroku. 

**7:15pm:** Site is deployed on Heroku. Now we are going to fix some minor issues. Clean up the code a bit. SMACCS the CSS. Build out a nicer error page. 

**8:00pm:** Error page is working. We cleaned up server.js formatting a bit. Now trying to reorganize our functions. 

**8:30pm:** In refactoring, we discovered that our delete drink function is not working correctly. Looking to fix.

**8:45pm:** Finally fixed the delete drink function. Committing. Going to probably call it a night now. Too many ups and downs tonight. 

### Day 9 // 2020.02.27

**6:30pm:** Today we are going to get final touches in. Maybe a little CSS leftover. Flesh out the ReadMe. And then work on our presentation PowerPoint. The goal is to have everything wrapped up so we can all leave early and get some sleep tonight!

**7:30pm:** PowerPoint is looking good. ReadMe is almost all polished up. We will finish these up and rehearse our presentation a bit before heading home early. A job well done!

## Credit
 
* [Nav bar code](https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_mobile_navbar)
* [Background image](https://www.flickr.com/photos/130701539@N04/16114643463)
