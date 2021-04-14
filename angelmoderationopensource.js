const dbd = require("dbd.js")
const bot = new dbd.Bot({
  sharding: false, //true or false
  shardAmount: 2, //Shard amount
  mobile: false, //true or false - Discord Mobile Status
  //dbhToken: "API KEY", Remove // if using, get an API Key from their Server
  token: "YOUR BOT TOKEN", //Discord Bot Token
  prefix: ["$getServerVar[prefix]"] //Change PREFIX to your Prefix
});


bot.onMessage();
//commands

bot.command({
  name: "level",
  code: `
$username[$mentioned[1;yes]]'s exp is: $getUserVar[exp;$mentioned[1;yes]]
`
});

bot.command({
  name: "$alwaysExecute",
  code: `$setUserVar[exp;$sum[$getUserVar[exp];$random[1;5]]]`
});

bot.command({
  name: "$alwaysExecute",
  code: `$if[$nickname[$authorID]==slut;]
$changeNickname[$authorID;Moderated Nickname]
$endIf

$if[$nickname[$authorID]==daddy;]
$changeNickname[$authorID;Moderated Nickname]
$endIf

$if[$nickname[$authorID]==thot;]
$changeNickname[$authorID;Moderated Nickname]
$endIf

$if[$nickname[$authorID]==hoe;]
$changeNickname[$authorID;Moderated Nickname]
$endIf

$if[$nickname[$authorID]==fuck;]
$changeNickname[$authorID;Moderated Nickname]
$endIf

$if[$nickname[$authorID]==ass;]
$changeNickname[$authorID;Moderated Nickname]
$endIf

$if[$nickname[$authorID]==cumslut;]
$changeNickname[$authorID;Moderated Nickname]
$endIf

$if[$nickname[$authorID]==cum;]
$changeNickname[$authorID;Moderated Nickname]
$endIf

$if[$nickname[$authorID]==dumbass;]
$changeNickname[$authorID;Moderated Nickname]
$endIf

$if[$nickname[$authorID]==vigina;]
$changeNickname[$authorID;Moderated Nickname]
$endIf

$if[$nickname[$authorID]==dick;]
$changeNickname[$authorID;Moderated Nickname]
$endIf

$if[$nickname[$authorID]==dickrider;]
$changeNickname[$authorID;Moderated Nickname]
$endIf

$if[$nickname[$authorID]==dickriding;]
$changeNickname[$authorID;Moderated Nickname]
$endIf

$if[$nickname[$authorID]==bitch;]
$changeNickname[$authorID;Moderated Nickname]
$endIf

$if[$nickname[$authorID]==daddys hoe;]
$changeNickname[$authorID;Moderated Nickname]
$endIf

`
});

bot.onChannelCreate({
  channel: "$getServerVar[audit]",
  code: `
$title[New channel created]
$description[$username#$discriminator[$authorID]has created a channel called $channelName]
`
});
bot.onChannelCreate();


bot.command({
  name: "set-audits",
  code: `$setServerVar[audit;$mentionedChannels[1]]
$title[audit's set!]
$description[Audits channel has been set to: <#$mentionedChannels[1]>
]
$argsCheck[1;You need to mention a channel]
`
});


bot.command({
  name: "enable-automod",
  code: `
$setServerVar[automod;enabled]
$title[Enabled]
$description[Automod is now enabled!]
`
});



bot.command({
  name: "ping",
  code: `Pong? \`?\`
$editIn[5s;Pong! \`$ping\`]`
});


bot.command({
  name: "hello", //Command Name
  code: `Hello <@$authorID>` //Code inside of ``
});

bot.command({
  name: "say", //Command Name
  code: `
$deletecommand
$noMentionMessage` //Code inside of ``
});

bot.command({
  name: "bot-info", //Command Name
  code: `
$title[]
$description[
Created: March, 17, 2021

Owner: $username[YOUR ID HERE]#$discriminator[YOUR ID HERE]

Active since: $uptime

Ping: $ping

Music status: online

CPU - $cpu%

RAM - $ram%
]
`
});

bot.command({
  name: "play", //Command Name
  code: `$playSong[$message;120m;yes;yes;unexpected handle in file index.js request music]
`
});

bot.command({
  name: "loop",
  code: `$loopQueue 
looping...
`
});

bot.command({
  name: "ban",
  code: `
$onlyPerms[kick;{title:Missing Permissions}{description:You need the Kick Permission to execute this Command!}{footer:}{timestamp:ms}{color:RANDOM}]
$title[Ban report]
$description[
A ban report has been filed please await verifaction
]
$footer[Break the rules and your done for]
$addReactions[🔨]
$setServerVar[banauthor;$username#$discriminator[$authorID]]
$setServerVar[banuser;$mentioned[1]]
$setServerVar[banreason;$noMentionMessage]
`
});

bot.command({
name: "checkbans",
code: `
$onlyPerms[ban;Only staff can do this]
$title[]
$description[
Moderator: $getServerVar[banauthor]

Reason: $getServerVar[banreason]

User: <@!$getServerVar[banuser]>

UserID: $getServerVar[banuser]


]
$addReactions[❤]
`
})

bot.command({
    name: "acceptban", 
    code: `
$onlyPerms[ban;]
$ban[$getServerVar[banuser];$getServerVar[banreason]]
$title[Banned]
$description[The ban was successfully made]
$addReactions[✔]
$suppressErrors[A error occurred please try again]
`
})

bot.command({
name: "declineban",
code: `
$onlyPerms[ban;]
$title[Ban declined]
$description[The user was not banned]
$addReactions[❌]
$suppressErrors[A error occurred please try again]
`
})

bot.command({
name:"declineban",
aliases: "acceptban",
code: `
$onlyPerms[ban;]
$setServerVar[banuser;None selected]
$setServerVar[banreason;None selected]
$setServerVar[banauthor;None selected]`
})

bot.command({
name: "unban",
code: `
$onlyBotPerms[ban;I need the ban permission]
$onlyPerms[ban;You need the ban permission]
$unban[$message;Member was unbanned by $username#$discriminator]
$title[Member unbanned]
$description[$username[$message]#$discriminator[$message] was unbanned by $username#$discriminator]

`
})

bot.command({
name: "shutdown",
code: `
$onlyForIDs[YOUR ID HERE;]
$shutdown`
})

bot.deletedCommand({
  channel: "$channelID",
  code: `$setChannelVar[snipe_msg;$message]
 $setChannelVar[snipe_author;$authorID]
 $setChannelVar[snipe_channel;$channelID]
 $setChannelVar[snipe_date;$day.$month.$year - $hour:$minute]`
});
bot.onMessageDelete();

bot.command({
  name: "snipe",
  code: `
$author[$userTag[$getChannelVar[snipe_author;$mentionedChannels[1;yes]]];$userAvatar[$getChannelVar[snipe_author;$mentionedChannels[1;yes]]]]
$description[$getChannelVar[snipe_msg;$mentionedChannels[1;yes]]]
$footer[#$channelName[$getChannelVar[snipe_channel;$mentionedChannels[1;yes]]] | $getChannelVar[snipe_date;$mentionedChannels[1;yes]]]
$onlyIf[$getChannelVar[snipe_msg;$mentionedChannels[1;yes]]!=;Theres nothing to snipe in <#$mentionedChannels[1;yes]>]
 `
});

bot.command({
  name: "nuke",
  code: ` $onlyPerms[managemessages;managechannels;only staff]
 $onlyBotPerms[managechannels;i need manage channels to go any further]
 $deleteChannels[$channelID]
$cloneChannel
`
});

bot.command({
  name: "kick",
  code: `
$onlyIf[$mentionedRoles[1]<$highestRole[$authorID];You cant kick someone whos a higher role then you]
$onlyPerms[kick;{title:Missing Permissions}{description:You need the Ban Permission to execute this Command!}{footer:}{timestamp:ms}{color:RANDOM}]
$author[$userTag[$authorID] has kicked $userTag[$mentioned[1;no]];$userAvatar[$clientID]]
$color[RANDOM]
$title[Kick successfully executed]
$description[The user $userTag[$mentioned[1]] has been kicked by $userTag[$authorID]
$onlyIf[$mentionedRoles[1]<$highestRole[$authorID];You cant kick someone whos a higher role then you]
Reason: $username kicked $username[$mentioned[1]] for $noMentionMessage]
$addTimestamp
$kick[$mentioned[1];$noMentionMessage]
$if[$isNumber[$message[1]]==true]
$argsCheck[>2;{title:Error occured! Arguments are missing!}{description:You have not provided enough arguments for this command! Please use this instead: **$getServerVar[prefix]ban (user/id) (reason)**}{footer:}{timestamp:ms}{color:RANDOM}]
$onlyPerms[kick;{title:Missing Permissions}{description:You need the Kick Permission to execute this Command!}{footer:}{timestamp:ms}{color:RANDOM}]
$author[$userTag[$authorID] has kicked $userTag[$message[1]];$userAvatar[$clientID]]
$color[RANDOM]
$title[kick executed]
$description[The user $userTag[$message[1]] has been kicked by $userTag[$authorID]
$onlyIf[$mentionedRoles[1]<$highestRole[$authorID];You cant kick someone whos a higher role then you]
Reason: $replaceText[$message;$message[1] ;;1]]
$footer[]
$addTimestamp
$kick[$message[1];$replaceText[$message;$message[1] ;;1]]
$endif
$suppressErrors[please mention someone to kick them]
`
});

bot.command({
  name: "Stop",
  code: `Song Has Stopped By <@$authorid>
 $suppressErrors[:x: Failed To Stop Song!]
 $stopSong`
});

bot.command({
  name: "setaudit",
  code: `$setServerVar[audit;$mentionedChannels[1]]
 $title[Audits set]
$description[The audit logger has been set to <#$mentionedChannels[1]>]
 
 
 `
});

bot.command({
  name: "kick",
  code: `<@!$authorID> kicked <@!$mentioned[1]> 
 Reason: $noMentionMessage
 $useChannel[$getServerVar[audit]]
 $suppressErrors
`
});

bot.command({
  name: "Resume",
  code: `$resumesong`
});

bot.command({
  name: "pause",
  code: `$pausesong`
});

bot.command({
  name: "volume",
  code: `
$deletecommand
$volume[$message]`
});

bot.command({
  name: `skip`,
  code: `$skipSong
 now playing $songInfo[title]
 $cooldown[3s;wait %time%]`
});

bot.command({
  name: "queuelength",
  code: `The queue has $queueLength songs!`
});

bot.command({
  name: "songInfo",
  code: `$title[Song Info]
 $description[Currently Playing:$songInfo[title]
 Description:$songInfo[description]
 Thumbnail:$songInfo[thumbnail]]
 $color[fb0606]
 `
});

bot.command({
  name: "tempban",
  code: `
 $unban[$mentioned[1]]
 $wait[$message[2]]
 $ban[$mentioned[1];$noMentionMessage]
 $channelSendMessage[$channelID;<@$mentioned[1]> has been successfully tempbanned.]
 $argsCheck[>2;Please mention a user to tempban & enter a time!]
 `
});

bot.command({
    name: "slash",
    code: `
$onlyPerms[admin;You need admin]
$createSlashCommand[$guildID;Custom slash;This is a custom slash command]`
})
bot.interactionCommand({
    name: "Package", 
    code: `$interactionReply[$message]`
})
bot.onInteractionCreate()

bot.command({
  name: "whois",
  code: `
$thumbnail[$userAvatar[$findUser[$message]]]
$title[User Info]
$description[[$username[$findUser[$message]]\\]($userAvatar[$findUser[$message];2048;yes])
**Name:**
$username[$findUser[$message]]#$discriminator[$findUser[$message]]
**ID:**
$mentioned[1;yes]
**Created at:**
$creationDate[$findUser[$message];date]
($creationDate[$findUser[$message];time])
**Joined:**
$memberJoinedDate[$findUser[$message];time] ago.
**Platform:**
$customEmoji[$platform[$findUser[$message]]] $platform[$mentioned[1;yes]]
**Status:**
$customEmoji[$status[$findUser[$message]]] $status[$mentioned[1;yes]]
**Custom Status:**
$getCustomStatus[$findUser[$message]]
**Highest Role:**
<@&$highestRole[$findUser[$message]]>
**Roles:**
$userRoles[$findUser[$message];mentions]
**Permissions:**
$userPerms[$findUser[$message]]
]
$color[00FCFF]`
});

bot.command({
  name: "clear",
  aliases: ["purge"],
  code: `
 $deleteIn[5s]
 $author[Cleaning;https://thumbs.gfycat.com/AltruisticDistinctAoudad-size_restricted.gif]
$description[**Done** \`$noMentionMessage $replaceText[$replaceText[&$mentioned[1]&;&&;messages\` **were cleared**;1];&$mentioned[1]&;**of last messages of**;1] $replaceText[$replaceText[&$mentioned[1]&;&&;;1];&$mentioned[1]&;<@$mentioned[1]>;1]]
$clear[$message]
$color[RANDOM]
$footer[Cleared By: $username[$authorID]#$discriminator[$authorID]]
$suppressErrors[**Try:** \`$getServerVar[prefix]clear <number>\`]
$onlyIf[$noMentionMessage<=500; **You can eliminate 2-500 messages per command**]
$onlyIf[$noMentionMessage>=2;**You can eliminate 2-500 messages per command**]
$onlyIf[$noMentionMessage!=;** Add a number to delete the messages**, **Try:** \`$getServerVar[prefix]clear <number>\`]
$onlyIf[$isNumber[$noMentionMessage]==true;Choose the number of messages to delete! **Try:** \`$getServerVar[prefix]clear <number>\`]
$onlyIf[$message[1]!=;**Try:** \`$getServerVar[prefix]clear <number>\`]
$onlyBotPerms[managemessages;**I don't have \`MANAGE_MESSAGES\` permissions to use this command**]
$onlyPerms[managemessages;**You dont have this perm to delete messages:** __**Manage Messages**__]`
});

bot.command({
  name: "mute",
  code: `
$setTimeout[$replaceText[$replaceText[$checkCondition[$messageSlice[1]==];true;100d];false;$messageSlice[1]];
muteID: $mentioned[1]
mutedRole: $roleID[Muted]]
$giveRole[$mentioned[1];$roleID[Muted]]
 $channelSendMessage[$channelID;Succesfully Muted <@$mentioned[1]>]
 $onlyIf[$mentioned[1]!=$clientID;I can't mute myself!]
 $onlyIf[$mentioned[1]!=$authorID;You can't mute yourself!] $onlyIf[$hasRoles[$mentioned[1];$roleID[Muted]]==false;User is already muted]
$onlyBotPerms[manageroles;I don't have manage roles permission!]
$suppressErrors[Something went wrong...]
 $onlyIf[$roleExists[$findRole[Muted]]==true;I can't find Role "Muted" Please create that role and try again ]
 $onlyIf[$mentioned[1]!=;Please mention someone]
 $onlyBotPerms[manageroles;I need manage roles permissions!] 
 $onlyPerms[managemessages;You need manage messages permission to use this command]`
});



bot.command({
  name: "unmute",
  code: `
$takeRole[$mentioned[1];$roleID[Muted]]
 $channelSendMessage[$channelID;Succesfully Unmuted <@$mentioned[1]>]
$onlyBotPerms[manageroles;I don't have manage roles permission!]
$suppressErrors[Something went wrong...]
 $onlyIf[$roleExists[$findRole[Muted]]==true;I can't find Role "Muted" Please create that role and try again ]
 $onlyIf[$mentioned[1]!=;Please mention someone]
 $onlyBotPerms[manageroles;I need manage roles permissions!] 
 $onlyPerms[managemessages;You need manage messages permission to use this command]`
});


bot.command({
  name: "warn",
  code: ` 
$title[Success!]
$description[<@!$mentioned[1]> has been warned for $noMentionMessage]
$color[#00ffff]
$setUserVar[warn;$sum[$getServerVar[warn];1]]
$onlyPerms[managemessages; you need managemessages]
`
});

bot.command({
  name: "warnings",
  code: ` 
$title[warnings]
$description[<@!$mentioned[1]> warn count: $getUserVar[warn]]
$color[#00ffff]
$onlyPerms[managemessages;you need manage messages]
`
});

bot.command({
  name: "clearwarn",
  code: ` 
$title[Success!]
$description[<@!$mentioned[1]> now has $getServerVar[warn] warns]
$color[#00ffff]
$setUserVar[warn;$sub[$getServerVar[warn];-1]]
$onlyPerms[managemessages;you need manage messages]
`
});

bot.command({
  name: "setprefix",
  code: ` 
$title[Success!]
$description[My new prefix is **$message**]
$setServerVar[prefix;$message]
$onlyPerms[admin;you need admin]
`
});

bot.command({
  name: "reboot",
  code: ` $onlyForIDs[YOUR ID HERE;only for devs]
$reboot[index.js]
`
});

bot.command({
  name: "shorten",
  code: `
$onlyIf[$message == https://grabify.com;The link you put in is dangerous] 
$onlyIf[$message == https://pornhub.com;The link you put in is NSFW] 
$onlyIf[$message == https://hentaihaven.xxx;The link you put in is NSFW] 
$onlyIf[$message == http://grabify.com;The link you put in is dangerous] 
$onlyIf[$message == http://pornhub.com;The link you put in is NSFW] 
$onlyIf[$message == http://hentaihaven.xxx;The link you put in is dangerous] 
$onlyIf[$message == www.grabify.com;The link you put in is dangerous] 
$onlyIf[$message == www.pornhub.com;The link you put in is NSFW] 
$onlyIf[$message == www.hentaihaven;The link you put in is NSFW] 
$jsonRequest[https://api.toxy.ga/api/shorten?url=$message;url]`
});

bot.command({
  name: "textcreate",
  code: `$createFile[$message;file.txt]
`
});

bot.command({
  name: "playspotify",
  code: `$playSpotify[$message;120m;yes;yes;no;unable to accept link]
`
});

bot.command({
  name: "playsoundcloud",
  code: `$playSoundCloud[$message;120m;yes;yes;unable to except link]
`
});

bot.command({
  name: "help-music",
  code: `$title[Help menu]
$description[
play youtube: $getServerVar[prefix]play {YT link}
play spotify: $getServerVar[prefix]playspotify {spotify link}
play soundcloud: $getServerVar[prefix]playsoundcloud {soundcloud link}

pause: $getServerVar[prefix]pause
resume: $getServerVar[prefix]resume
stop: $getServerVar[prefix]stop
volume: $getServerVar[prefix]volume {number}
view length: $getServerVar[prefix]queuelength
view current song info: $getServerVar[prefix]songinfo
]
`
});

bot.command({
  name: "invite",
  code: `$title[]
$description[
[invite link](YOUR BOT INVITE LINK)]
`
});

bot.command({
  name: "help-moderator",
  code: `$title[Help menu]
$description[
$getServerVar[prefix]ban - makes a ban report
$getServerVar[prefix]nuke - creates a channel then deletes the orignal to clear all messages
$getServerVar[prefix]checkbans - check a ban report
$getServerVar[prefix]approveban - approves a ban
$getServerVar[prefix]declineban - declines a ban
$getServerVar[prefix]kick - kicks someone from the server
$getServerVar[prefix]mute - mutes someone
$getServerVar[prefix]unmute - unmutes someone
$getServerVar[prefix]warn - warns someone
$getServerVar[prefix]warnings - shows the users warns 
$getServerVar[prefix]clearwarn - clears the users previous
$getServerVar[prefix]setprefix - sets a prefix for the bot
$getServerVar[prefix]clear - clears a certian amount of messages
$getServerVar[prefix]say - says a message
]
$footer[excuted by $username]
`
});

bot.command({
  name: "help",
  code: `
$title[Help menu]
$description[
moderator help: $getServerVar[prefix]help-moderator

utitlty help: $getServerVar[prefix]help-utitlty

music help: $getServerVar[prefix]help-music
]
`
});

bot.command({
name: "help-utitlty",
code: `
$title[Help menu]
$description[
$getServerVar[prefix]set-suggestion - sets a sugestion channel
$getServerVar[prefix]suggest - make a suggestion
$getServerVar[prefix]gstart {time} {prze} - start a giveaway

`
})

bot.command({
name: "set-suggestion",
code: `$setServerVar[suggestion;$mentionedChannels[1]]
$title[Suggestions set]
$description[Suggestions have been set to <#$mentionedChannels[1]>!]`
})

bot.command({
name: "suggest",
code: `$useChannel[$getServerVar[suggestion]]
$title[New suggestion]
$description[$message]
$footer[suggestion by $username#$discriminator[$authorID]]
$addReactions[👍;👎;🤷‍♂️]
$suppressErrors[There is no suggestion channel set]

`
})




bot.command({
  name: "gstart",
  code: `
$deletecommand
$addReactions[🎉]
$title[Giveaway!]
$description[
Prize: $message

Hoster: <@!$authorID>
]
$editIn[$message[1];Giveaway Ended]
`
});

bot.command({
  name: "gstart",
  code: `
$wait[$message[1]]
$randomMention 
$title[You have won the giveaway!]
$description[
Dm <@!$authorID> to claim your prize
Prize: $message]
`
});

//When pinged on PC
bot.command({
  name: "<@!821706897396334653>",
  code: `hello my prefix is $getServerVar[prefix]`,
  nonPrefixed: true
});

bot.reactionRemoveCommand({
 channel: "$getServerVar[rrchannel]",
 code: `
$takeRoles[$authorID;$getServerVar[rrrole]]
$onlyIf[$messageID==$getServerVar[rrmessageid];]`
})
bot.onReactionRemove()

bot.reactionAddCommand({
 channel: "$getServerVar[rrchannel]",
 code: `
$giveRoles[$authorID;$getServerVar[rrrole]]
$onlyIf[$messageID==$getServerVar[rrmessageid];]`
})
bot.onReactionAdd()

bot.command({
name: "setup-rr",
code: `
$setServerVar[rrrole;$mentionedRoles[1]]
$setServerVar[rrmessageid;$noMentionMessage[1]]
$setServerVar[rrchannel;$mentionedChannels[1]]
$title[Reaction Roles]
$description[
The reaction channel: <#$mentionedChannels[1]>
The reaction role: <@&$mentionedRoles[1]>
The reaction messageID: $noMentionMessage[1]]`
})

bot.command({
name: "setup-rr2",
code: `
$setServerVar[rrrole2;$mentionedRoles[1]]
$setServerVar[rrmessageid2;$noMentionMessage[1]]
$setServerVar[rrchannel2;$mentionedChannels[1]]
$title[Reaction Roles]
$description[
The reaction channel: <#$mentionedChannels[1]>
The reaction role: <@&$mentionedRoles[1]>
The reaction messageID: $noMentionMessage[1]]`
})

bot.reactionRemoveCommand({
 channel: "$getServerVar[rrchannel2]",
 code: `
$takeRoles[$authorID;$getServerVar[rrrole2]]
$onlyIf[$messageID==$getServerVar[rrmessageid2];]`
})
bot.onReactionRemove()

bot.reactionAddCommand({
 channel: "$getServerVar[rrchannel2]",
 code: `
$giveRoles[$authorID;$getServerVar[rrrole2]]
$onlyIf[$messageID==$getServerVar[rrmessageid2];]`
})
bot.onReactionAdd()

bot.command({
name:"$alwaysExecute",
code:`$setChannelVar[mh;$getChannelVar[mh]\n\ Author: $userTag\ (At $hour:$minute)\n$message]`})

bot.command({
name: "eval",
code: `
$onlyForIDs[YOUR ID;Devopler only command]
Result: $eval[$message]
`
})

bot.command({
name:"transcript",
code:`
$setChannelVar[mh;]
$dm[$mentioned[1;yes]]
$title[Transcript for $channelName[$mentionedChannels[1;yes]]]
$description[$getChannelVar[mh;$mentionedChannels[1;yes]]]
$sendMessage[The transcript for <#$mentionedChannels[1;yes]> was sent to $userTag[$mentioned[1;yes]]!;no]
$onlyIf[$getChannelVar[mh]!=;There is no transcript for <#$mentionedChannels[1;yes]>!]
$onlyPerms[managechannels;You need the \`MANAGE CHANNEL\` permissions to view a transcript!]`})

bot.command({
name: "transcriptfile",
code: `$dm[$mentioned[1;yes]]
$createFile[$getChannelVar[mh;$mentionedChannels[1;yes]];transcriptlog.txt]
$channelSendMessage[$mentionedChannels[1;yes];The html file for <#$mentionedChannels[1;yes]> was sent to $userTag[$mentioned[1;yes]] in dms!]
$onlyIf[$getChannelVar[mh]!=;There is no transcript for <#$mentionedChannels[1;yes]>!]
$onlyPerms[managechannels;You need the \`MANAGE CHANNEL\` permission]`})

bot.variables({
  snipe_msg: "",
  snipe_author: "",
  snipe_channel: "",
  snipe_date: ""
});

//Read more information about status in docs:
//https://dbd.leref.ga/guide/bot-status

//variables

bot.variables({
  prefix: "!"
});

bot.variables({
  warn: "0"
});

bot.variables({
  status: "ello mate"
});

bot.variables({
  money: "0"
});

bot.variables({
  bank: "0"
});

bot.variables({
  audit: ""
});

bot.variables({
  welcomec: ""
});

bot.variables({
  welcomem: ""
});

bot.variables({
  audit: ""
});

bot.variables({
  modmail: ""
});

bot.variables({
  editauthor: "",
  editmessage: "",
  editauthor: "",
  editchannel: "",
  automod: "disabled",
  exp: "0",
  level: "0"
});

bot.variables({
  banreason: "Empty",
  banauthor: "Empty",
  banuser: "Ban reports empty"

})

bot.variables({
 suggestion: "",
 antispam: "0",
 channelback: ""
})

bot.variables({
rrreaction: "",
rrrole: "",
rrchannel: "",
rrmessageid: "",
rrmessageid2: "",
rrchannel2: "",
rrrole2: "",
rrreaction2: "",
mh: "",
statschannel: "",
statsmessageid: ""
})

bot.status({
  text: "http://solo.to/realderpyangel",
  type: "LISTENING",
  time: 12
})
