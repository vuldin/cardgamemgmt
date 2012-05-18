# CardGameMgmt

## Overview

This repository contains a trading card game (TCG) tournament/management web application. The name of this project is CardGameMgmt, or CGM.
CGM aims to be a web-based alternative to other applications such as OCTGN, and the plan is to be compatible with the deck format used in that project.
For more information on OCTGN see https://github.com/kellyelton/OCTGN.

## Setup

CGM follows the format for Mozilla webapps, and will be included in the upcoming Mozilla Marketplace (https://marketplace.mozilla.org/en-US/login).
CGM is based on HTML5, using canvas, localStorage, appCache, file API, etc. The latest version of the jquery framework is also being used. There is 
a separate implementation of some UI components which makes use of Dojo 1.7 and CSS styling (this implementation is not currently the main 
implementation).

## Multi-user plans

The current plan is to not host game sessions between multiple users on a standalone server. Instead, the hope is that server functionality will be 
included in each application. Requests/responses will be verified by other connecting users based on agreed-upon session information, and clients 
themselves will be verified as being the correct version (and expected files) through the webapp manifest and HTML5 file APIs (md5sum, etc.).

This plan may prove to be impossible for adequately ensuring fair play during card games, but the hope is that a "high-enough" barrier to cheating 
will be part of the app design so that cheating will be too hard to accomplish for the vast majority of users.

A server will be in place for the basic purposes of hosting the lastest version of the client as well as allowing for clients to advertise their 
availability for various card games. Client authentication will likely be based on BrowserID, and the server could possibly collect match win/loss 
info for those clients who choose to report this information.