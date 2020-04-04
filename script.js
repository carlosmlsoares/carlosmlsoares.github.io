var socket = new Rete.Socket('String');
var container = document.querySelector('#rete');

var editor = new Rete.NodeEditor('demo@0.1.0', container);
var devices= ["Sonoff Quarto","ChromeCast"]
editor.use(ConnectionPlugin);
    editor.use(VueRenderPlugin);
    editor.use(ContextMenuPlugin,{
        searchBar: true,
        delay: 100,
    });
    editor.use(AreaPlugin);

    editor.use(DockPlugin.default, {
      container:document.querySelector('.dock'),
      itemClass: 'dock-item', // default: dock-item 
      plugins: [VueRenderPlugin] // render plugins
    });

var components=[]
function teste(){
  devices= ["Sonoff Quarto","ChromeCast"]
}

var servs= [
  {
      "domain": "homeassistant",
      "services": {
          "check_config": {
              "description": "Check the Home Assistant configuration files for errors. Errors will be displayed in the Home Assistant log.",
              "fields": {}
          },
          "reload_core_config": {
              "description": "Reload the core configuration.",
              "fields": {}
          },
          "restart": {
              "description": "Restart the Home Assistant service.",
              "fields": {}
          },
          "set_location": {
              "description": "Update the Home Assistant location.",
              "fields": {
                  "latitude": {
                      "description": "Latitude of your location",
                      "example": 32.87336
                  },
                  "longitude": {
                      "description": "Longitude of your location",
                      "example": 117.22743
                  }
              }
          },
          "stop": {
              "description": "Stop the Home Assistant service.",
              "fields": {}
          },
          "toggle": {
              "description": "Generic service to toggle devices on/off under any domain. Same usage as the light.turn_on, switch.turn_on, etc. services.",
              "fields": {
                  "entity_id": {
                      "description": "The entity_id of the device to toggle on/off.",
                      "example": "light.living_room"
                  }
              }
          },
          "turn_off": {
              "description": "Generic service to turn devices off under any domain. Same usage as the light.turn_on, switch.turn_on, etc. services.",
              "fields": {
                  "entity_id": {
                      "description": "The entity_id of the device to turn off.",
                      "example": "light.living_room"
                  }
              }
          },
          "turn_on": {
              "description": "Generic service to turn devices on under any domain. Same usage as the light.turn_on, switch.turn_on, etc. services.",
              "fields": {
                  "entity_id": {
                      "description": "The entity_id of the device to turn on.",
                      "example": "light.living_room"
                  }
              }
          },
          "update_entity": {
              "description": "Force one or more entities to update its data",
              "fields": {
                  "entity_id": {
                      "description": "One or multiple entity_ids to update. Can be a list.",
                      "example": "light.living_room"
                  }
              }
          }
      }
  },
  {
      "domain": "persistent_notification",
      "services": {
          "create": {
              "description": "Show a notification in the frontend.",
              "fields": {
                  "message": {
                      "description": "Message body of the notification. [Templates accepted]",
                      "example": "Please check your configuration.yaml."
                  },
                  "notification_id": {
                      "description": "Target ID of the notification, will replace a notification with the same Id. [Optional]",
                      "example": 1234
                  },
                  "title": {
                      "description": "Optional title for your notification. [Optional, Templates accepted]",
                      "example": "Test notification"
                  }
              }
          },
          "dismiss": {
              "description": "Remove a notification from the frontend.",
              "fields": {
                  "notification_id": {
                      "description": "Target ID of the notification, which should be removed. [Required]",
                      "example": 1234
                  }
              }
          },
          "mark_read": {
              "description": "Mark a notification read.",
              "fields": {
                  "notification_id": {
                      "description": "Target ID of the notification, which should be mark read. [Required]",
                      "example": 1234
                  }
              }
          }
      }
  },
  {
      "domain": "system_log",
      "services": {
          "clear": {
              "description": "Clear all log entries.",
              "fields": {}
          },
          "write": {
              "description": "Write log entry.",
              "fields": {
                  "level": {
                      "description": "Log level: debug, info, warning, error, critical. Defaults to 'error'.",
                      "example": "debug"
                  },
                  "logger": {
                      "description": "Logger name under which to log the message. Defaults to 'system_log.external'.",
                      "example": "mycomponent.myplatform"
                  },
                  "message": {
                      "description": "Message to log. [Required]",
                      "example": "Something went wrong"
                  }
              }
          }
      }
  },
  {
      "domain": "recorder",
      "services": {
          "purge": {
              "description": "Start purge task - delete events and states older than x days, according to keep_days service data.",
              "fields": {
                  "keep_days": {
                      "description": "Number of history days to keep in database after purge. Value >= 0.",
                      "example": 2
                  },
                  "repack": {
                      "description": "Attempt to save disk space by rewriting the entire database file.",
                      "example": true
                  }
              }
          }
      }
  },
  {
      "domain": "group",
      "services": {
          "reload": {
              "description": "Reload group configuration.",
              "fields": {}
          },
          "remove": {
              "description": "Remove a user group.",
              "fields": {
                  "object_id": {
                      "description": "Group id and part of entity id.",
                      "example": "test_group"
                  }
              }
          },
          "set": {
              "description": "Create/Update a user group.",
              "fields": {
                  "add_entities": {
                      "description": "List of members they will change on group listening.",
                      "example": "domain.entity_id1, domain.entity_id2"
                  },
                  "all": {
                      "description": "Enable this option if the group should only turn on when all entities are on.",
                      "example": true
                  },
                  "control": {
                      "description": "Value for control the group control.",
                      "example": "hidden"
                  },
                  "entities": {
                      "description": "List of all members in the group. Not compatible with 'delta'.",
                      "example": "domain.entity_id1, domain.entity_id2"
                  },
                  "icon": {
                      "description": "Name of icon for the group.",
                      "example": "mdi:camera"
                  },
                  "name": {
                      "description": "Name of group",
                      "example": "My test group"
                  },
                  "object_id": {
                      "description": "Group id and part of entity id.",
                      "example": "test_group"
                  },
                  "view": {
                      "description": "Boolean for if the group is a view.",
                      "example": true
                  },
                  "visible": {
                      "description": "If the group is visible on UI.",
                      "example": true
                  }
              }
          },
          "set_visibility": {
              "description": "Hide or show a group.",
              "fields": {
                  "entity_id": {
                      "description": "Name(s) of entities to set value.",
                      "example": "group.travel"
                  },
                  "visible": {
                      "description": "True if group should be shown or False if it should be hidden.",
                      "example": true
                  }
              }
          }
      }
  },
  {
      "domain": "script",
      "services": {
          "reload": {
              "description": "Reload all the available scripts",
              "fields": {}
          },
          "toggle": {
              "description": "Toggle script",
              "fields": {
                  "entity_id": {
                      "description": "Name(s) of script to be toggled.",
                      "example": "script.arrive_home"
                  }
              }
          },
          "turn_off": {
              "description": "Turn off script",
              "fields": {
                  "entity_id": {
                      "description": "Name(s) of script to be turned off.",
                      "example": "script.arrive_home"
                  }
              }
          },
          "turn_on": {
              "description": "Turn on script",
              "fields": {
                  "entity_id": {
                      "description": "Name(s) of script to be turned on.",
                      "example": "script.arrive_home"
                  }
              }
          }
      }
  },
  {
      "domain": "cast",
      "services": {
          "show_lovelace_view": {
              "description": "Show a Lovelace view on a Chromecast.",
              "fields": {
                  "entity_id": {
                      "description": "Media Player entity to show the Lovelace view on.",
                      "example": "media_player.kitchen"
                  },
                  "view_path": {
                      "description": "The path of the Lovelace view to show.",
                      "example": "downstairs"
                  }
              }
          }
      }
  },
  {
      "domain": "switch",
      "services": {
          "toggle": {
              "description": "Toggles a switch state.",
              "fields": {
                  "entity_id": {
                      "description": "Name(s) of entities to toggle.",
                      "example": "switch.living_room"
                  }
              }
          },
          "turn_off": {
              "description": "Turn a switch off.",
              "fields": {
                  "entity_id": {
                      "description": "Name(s) of entities to turn off.",
                      "example": "switch.living_room"
                  }
              }
          },
          "turn_on": {
              "description": "Turn a switch on.",
              "fields": {
                  "entity_id": {
                      "description": "Name(s) of entities to turn on",
                      "example": "switch.living_room"
                  }
              }
          }
      }
  },
  {
      "domain": "cloud",
      "services": {
          "remote_connect": {
              "description": "Make instance UI available outside over NabuCasa cloud.",
              "fields": {}
          },
          "remote_disconnect": {
              "description": "Disconnect UI from NabuCasa cloud.",
              "fields": {}
          }
      }
  },
  {
      "domain": "tts",
      "services": {
          "clear_cache": {
              "description": "Remove cache files and RAM cache.",
              "fields": {}
          },
          "google_translate_say": {
              "description": "",
              "fields": {}
          }
      }
  },
  {
      "domain": "media_player",
      "services": {
          "clear_playlist": {
              "description": "Send the media player the command to clear players playlist.",
              "fields": {
                  "entity_id": {
                      "description": "Name(s) of entities to change source on.",
                      "example": "media_player.living_room_chromecast"
                  }
              }
          },
          "media_next_track": {
              "description": "Send the media player the command for next track.",
              "fields": {
                  "entity_id": {
                      "description": "Name(s) of entities to send next track command to.",
                      "example": "media_player.living_room_sonos"
                  }
              }
          },
          "media_pause": {
              "description": "Send the media player the command for pause.",
              "fields": {
                  "entity_id": {
                      "description": "Name(s) of entities to pause on.",
                      "example": "media_player.living_room_sonos"
                  }
              }
          },
          "media_play": {
              "description": "Send the media player the command for play.",
              "fields": {
                  "entity_id": {
                      "description": "Name(s) of entities to play on.",
                      "example": "media_player.living_room_sonos"
                  }
              }
          },
          "media_play_pause": {
              "description": "Toggle media player play/pause state.",
              "fields": {
                  "entity_id": {
                      "description": "Name(s) of entities to toggle play/pause state on.",
                      "example": "media_player.living_room_sonos"
                  }
              }
          },
          "media_previous_track": {
              "description": "Send the media player the command for previous track.",
              "fields": {
                  "entity_id": {
                      "description": "Name(s) of entities to send previous track command to.",
                      "example": "media_player.living_room_sonos"
                  }
              }
          },
          "media_seek": {
              "description": "Send the media player the command to seek in current playing media.",
              "fields": {
                  "entity_id": {
                      "description": "Name(s) of entities to seek media on.",
                      "example": "media_player.living_room_chromecast"
                  },
                  "seek_position": {
                      "description": "Position to seek to. The format is platform dependent.",
                      "example": 100
                  }
              }
          },
          "media_stop": {
              "description": "Send the media player the stop command.",
              "fields": {
                  "entity_id": {
                      "description": "Name(s) of entities to stop on.",
                      "example": "media_player.living_room_sonos"
                  }
              }
          },
          "play_media": {
              "description": "Send the media player the command for playing media.",
              "fields": {
                  "entity_id": {
                      "description": "Name(s) of entities to seek media on",
                      "example": "media_player.living_room_chromecast"
                  },
                  "media_content_id": {
                      "description": "The ID of the content to play. Platform dependent.",
                      "example": "https://home-assistant.io/images/cast/splash.png"
                  },
                  "media_content_type": {
                      "description": "The type of the content to play. Must be one of image, music, tvshow, video, episode, channel or playlist",
                      "example": "music"
                  }
              }
          },
          "select_sound_mode": {
              "description": "Send the media player the command to change sound mode.",
              "fields": {
                  "entity_id": {
                      "description": "Name(s) of entities to change sound mode on.",
                      "example": "media_player.marantz"
                  },
                  "sound_mode": {
                      "description": "Name of the sound mode to switch to.",
                      "example": "Music"
                  }
              }
          },
          "select_source": {
              "description": "Send the media player the command to change input source.",
              "fields": {
                  "entity_id": {
                      "description": "Name(s) of entities to change source on.",
                      "example": "media_player.media_player.txnr535_0009b0d81f82"
                  },
                  "source": {
                      "description": "Name of the source to switch to. Platform dependent.",
                      "example": "video1"
                  }
              }
          },
          "shuffle_set": {
              "description": "Set shuffling state.",
              "fields": {
                  "entity_id": {
                      "description": "Name(s) of entities to set.",
                      "example": "media_player.spotify"
                  },
                  "shuffle": {
                      "description": "True/false for enabling/disabling shuffle.",
                      "example": true
                  }
              }
          },
          "toggle": {
              "description": "Toggles a media player power state.",
              "fields": {
                  "entity_id": {
                      "description": "Name(s) of entities to toggle.",
                      "example": "media_player.living_room_chromecast"
                  }
              }
          },
          "turn_off": {
              "description": "Turn a media player power off.",
              "fields": {
                  "entity_id": {
                      "description": "Name(s) of entities to turn off.",
                      "example": "media_player.living_room_chromecast"
                  }
              }
          },
          "turn_on": {
              "description": "Turn a media player power on.",
              "fields": {
                  "entity_id": {
                      "description": "Name(s) of entities to turn on.",
                      "example": "media_player.living_room_chromecast"
                  }
              }
          },
          "volume_down": {
              "description": "Turn a media player volume down.",
              "fields": {
                  "entity_id": {
                      "description": "Name(s) of entities to turn volume down on.",
                      "example": "media_player.living_room_sonos"
                  }
              }
          },
          "volume_mute": {
              "description": "Mute a media player's volume.",
              "fields": {
                  "entity_id": {
                      "description": "Name(s) of entities to mute.",
                      "example": "media_player.living_room_sonos"
                  },
                  "is_volume_muted": {
                      "description": "True/false for mute/unmute.",
                      "example": true
                  }
              }
          },
          "volume_set": {
              "description": "Set a media player's volume level.",
              "fields": {
                  "entity_id": {
                      "description": "Name(s) of entities to set volume level on.",
                      "example": "media_player.living_room_sonos"
                  },
                  "volume_level": {
                      "description": "Volume level to set as float.",
                      "example": 0.6
                  }
              }
          },
          "volume_up": {
              "description": "Turn a media player volume up.",
              "fields": {
                  "entity_id": {
                      "description": "Name(s) of entities to turn volume up on.",
                      "example": "media_player.living_room_sonos"
                  }
              }
          }
      }
  },
  {
      "domain": "logbook",
      "services": {
          "log": {
              "description": "Create a custom entry in your logbook.",
              "fields": {
                  "domain": {
                      "description": "Icon of domain to display in custom logbook entry [Optional]",
                      "example": "light"
                  },
                  "entity_id": {
                      "description": "Entity to reference in custom logbook entry [Optional]",
                      "example": "light.kitchen"
                  },
                  "message": {
                      "description": "Message of the custom logbook entry",
                      "example": "is being used"
                  },
                  "name": {
                      "description": "Custom name for an entity, can be referenced with entity_id",
                      "example": "Kitchen"
                  }
              }
          }
      }
  },
  {
      "domain": "automation",
      "services": {
          "reload": {
              "description": "Reload the automation configuration.",
              "fields": {}
          },
          "toggle": {
              "description": "Toggle an automation.",
              "fields": {
                  "entity_id": {
                      "description": "Name of the automation to toggle on/off.",
                      "example": "automation.notify_home"
                  }
              }
          },
          "trigger": {
              "description": "Trigger the action of an automation.",
              "fields": {
                  "entity_id": {
                      "description": "Name of the automation to trigger.",
                      "example": "automation.notify_home"
                  }
              }
          },
          "turn_off": {
              "description": "Disable an automation.",
              "fields": {
                  "entity_id": {
                      "description": "Name of the automation to turn off.",
                      "example": "automation.notify_home"
                  }
              }
          },
          "turn_on": {
              "description": "Enable an automation.",
              "fields": {
                  "entity_id": {
                      "description": "Name of the automation to turn on.",
                      "example": "automation.notify_home"
                  }
              }
          }
      }
  },
  {
      "domain": "notify",
      "services": {
          "mobile_app_carlos_soares_s_mi_9t": {
              "description": "",
              "fields": {}
          },
          "notify": {
              "description": "Send a notification.",
              "fields": {
                  "data": {
                      "description": "Extended information for notification. Optional depending on the platform.",
                      "example": "platform specific"
                  },
                  "message": {
                      "description": "Message body of the notification.",
                      "example": "The garage door has been open for 10 minutes."
                  },
                  "target": {
                      "description": "An array of targets to send the notification to. Optional depending on the platform.",
                      "example": "platform specific"
                  },
                  "title": {
                      "description": "Optional title for your notification.",
                      "example": "Your Garage Door Friend"
                  }
              }
          }
      }
  },
  {
      "domain": "stream",
      "services": {
          "record": {
              "description": "Make a .mp4 recording from a provided stream.",
              "fields": {
                  "duration": {
                      "description": "Target recording length (in seconds). Default: 30",
                      "example": 30
                  },
                  "filename": {
                      "description": "The file name string.",
                      "example": "/tmp/my_stream.mp4"
                  },
                  "lookback": {
                      "description": "Target lookback period (in seconds) to include in addition to duration. Only available if there is currently an active HLS stream for stream_source. Default: 0",
                      "example": 5
                  },
                  "stream_source": {
                      "description": "The input source for the stream.",
                      "example": "rtsp://my.stream.feed:554"
                  }
              }
          }
      }
  },
  {
      "domain": "device_tracker",
      "services": {
          "see": {
              "description": "Control tracked device.",
              "fields": {
                  "battery": {
                      "description": "Battery level of device.",
                      "example": "100"
                  },
                  "dev_id": {
                      "description": "Id of device (find id in known_devices.yaml).",
                      "example": "phonedave"
                  },
                  "gps": {
                      "description": "GPS coordinates where device is located (latitude, longitude).",
                      "example": "[51.509802, -0.086692]"
                  },
                  "gps_accuracy": {
                      "description": "Accuracy of GPS coordinates.",
                      "example": "80"
                  },
                  "host_name": {
                      "description": "Hostname of device",
                      "example": "Dave"
                  },
                  "location_name": {
                      "description": "Name of location where device is located (not_home is away).",
                      "example": "home"
                  },
                  "mac": {
                      "description": "MAC address of device",
                      "example": "FF:FF:FF:FF:FF:FF"
                  }
              }
          }
      }
  },
  {
      "domain": "hassio",
      "services": {
          "addon_restart": {
              "description": "Restart a Hass.io docker add-on.",
              "fields": {
                  "addon": {
                      "description": "The add-on slug.",
                      "example": "core_ssh"
                  }
              }
          },
          "addon_start": {
              "description": "Start a Hass.io docker add-on.",
              "fields": {
                  "addon": {
                      "description": "The add-on slug.",
                      "example": "core_ssh"
                  }
              }
          },
          "addon_stdin": {
              "description": "Write data to a Hass.io docker add-on stdin .",
              "fields": {
                  "addon": {
                      "description": "The add-on slug.",
                      "example": "core_ssh"
                  }
              }
          },
          "addon_stop": {
              "description": "Stop a Hass.io docker add-on.",
              "fields": {
                  "addon": {
                      "description": "The add-on slug.",
                      "example": "core_ssh"
                  }
              }
          },
          "host_reboot": {
              "description": "Reboot the host system.",
              "fields": {}
          },
          "host_shutdown": {
              "description": "Poweroff the host system.",
              "fields": {}
          },
          "restore_full": {
              "description": "",
              "fields": {}
          },
          "restore_partial": {
              "description": "",
              "fields": {}
          },
          "snapshot_full": {
              "description": "",
              "fields": {}
          },
          "snapshot_partial": {
              "description": "",
              "fields": {}
          }
      }
  }
];

var ents={"sun.sun":{"entity_id":"sun.sun","state":"below_horizon","attributes":{"next_dawn":"2020-01-30T07:18:14+00:00","next_dusk":"2020-01-30T18:17:15+00:00","next_midnight":"2020-01-30T00:47:50+00:00","next_noon":"2020-01-30T12:47:45+00:00","next_rising":"2020-01-30T07:47:25+00:00","next_setting":"2020-01-30T17:48:04+00:00","elevation":-57.47,"azimuth":307.45,"rising":false,"friendly_name":"Sun"},"last_changed":"2020-01-29T18:06:15.997257+00:00","last_updated":"2020-01-29T23:01:30.008507+00:00","context":{"id":"07da46f072ee4c6e8490d2dbb2f308ad","parent_id":null,"user_id":null}},"binary_sensor.updater":{"entity_id":"binary_sensor.updater","state":"unavailable","attributes":{"friendly_name":"Updater"},"last_changed":"2020-01-29T18:06:25.646339+00:00","last_updated":"2020-01-29T18:06:25.646339+00:00","context":{"id":"d9fa8316f177484984263f396ecaf1bf","parent_id":null,"user_id":null}},"switch.sonoff_100034605a":{"entity_id":"switch.sonoff_100034605a","state":"off","attributes":{"device_id":"100034605a","rssi":-71,"friendly_name":"Sonoff Quarto"},"last_changed":"2020-01-29T18:08:13.955854+00:00","last_updated":"2020-01-29T20:47:06.011025+00:00","context":{"id":"055fc20df5d942ddb00a25a16424c70f","parent_id":null,"user_id":null}},"person.carlos_soares":{"entity_id":"person.carlos_soares","state":"unknown","attributes":{"editable":true,"id":"22ec52637ecd49cc8b038d127c13abfe","user_id":"5ced196571504c34bfd6c6d45325b442","friendly_name":"Carlos Soares"},"last_changed":"2020-01-29T18:06:26.912258+00:00","last_updated":"2020-01-29T18:06:31.341884+00:00","context":{"id":"9897b80f65ec4c0bac488b0823ff0c6d","parent_id":null,"user_id":null}},"automation.home_assistant_down":{"entity_id":"automation.home_assistant_down","state":"on","attributes":{"last_triggered":null,"id":"1574289055472","friendly_name":"Home Assistant Down"},"last_changed":"2020-01-29T18:06:26.954470+00:00","last_updated":"2020-01-29T18:06:26.954470+00:00","context":{"id":"4491f01416e44533bec62769a3e6bdd4","parent_id":null,"user_id":null}},"automation.notificar_que_a_luz_esta_acesa":{"entity_id":"automation.notificar_que_a_luz_esta_acesa","state":"on","attributes":{"last_triggered":"2020-01-29T18:08:13.822188+00:00","id":"1574764616272","friendly_name":"Notificar que a luz está acesa"},"last_changed":"2020-01-29T18:06:26.955607+00:00","last_updated":"2020-01-29T18:08:13.822846+00:00","context":{"id":"32fc601b54614098afebc4d699c545d1","parent_id":"7aac7653a58e40d18dd137323e3cec5f","user_id":null}},"automation.home_assistant_up":{"entity_id":"automation.home_assistant_up","state":"on","attributes":{"last_triggered":"2020-01-29T18:06:32.693319+00:00","id":"1574289902334","friendly_name":"Home Assistant Up"},"last_changed":"2020-01-29T18:06:26.956539+00:00","last_updated":"2020-01-29T18:06:32.694421+00:00","context":{"id":"631adbb93167439dbecb90e9f98e0f2f","parent_id":null,"user_id":null}},"automation.ligar_a_luz_ao_anoitecer":{"entity_id":"automation.ligar_a_luz_ao_anoitecer","state":"on","attributes":{"last_triggered":null,"id":"1575412366062","friendly_name":"Ligar a Luz ao Anoitecer"},"last_changed":"2020-01-29T18:06:26.957346+00:00","last_updated":"2020-01-29T18:06:26.957346+00:00","context":{"id":"b5e4abd800204e3b9cc97f1a14a6589b","parent_id":null,"user_id":null}},"group.all_switches":{"entity_id":"group.all_switches","state":"off","attributes":{"entity_id":["switch.sonoff_100034605a"],"order":0,"auto":true,"friendly_name":"all switches","hidden":true},"last_changed":"2020-01-29T18:08:13.957956+00:00","last_updated":"2020-01-29T18:08:13.957956+00:00","context":{"id":"e636ef09d3d3450fb21870db46689e9d","parent_id":null,"user_id":null}},"group.all_automations":{"entity_id":"group.all_automations","state":"on","attributes":{"entity_id":["automation.home_assistant_down","automation.home_assistant_up","automation.ligar_a_luz_ao_anoitecer","automation.notificar_que_a_luz_esta_acesa"],"order":1,"auto":true,"friendly_name":"all automations","hidden":true},"last_changed":"2020-01-29T18:06:27.301609+00:00","last_updated":"2020-01-29T18:06:27.301609+00:00","context":{"id":"3178142ff81f44ad8e81f4601584e851","parent_id":null,"user_id":null}},"media_player.chromecast":{"entity_id":"media_player.chromecast","state":"off","attributes":{"friendly_name":"ChromeCast","supported_features":21389},"last_changed":"2020-01-29T19:07:00.562736+00:00","last_updated":"2020-01-29T19:07:00.562736+00:00","context":{"id":"7812a9332a034518bcd621a232731d86","parent_id":null,"user_id":null}},"zone.home":{"entity_id":"zone.home","state":"zoning","attributes":{"hidden":true,"latitude":40.74101426921151,"longitude":-8.657226562500002,"radius":100,"friendly_name":"Início","icon":"mdi:home"},"last_changed":"2020-01-29T18:06:27.357568+00:00","last_updated":"2020-01-29T18:06:27.357568+00:00","context":{"id":"981fcaa20876457ca0885c7d8875a364","parent_id":null,"user_id":null}},"media_player.quarto":{"entity_id":"media_player.quarto","state":"off","attributes":{"friendly_name":"Quarto","supported_features":21389},"last_changed":"2020-01-29T19:06:53.694975+00:00","last_updated":"2020-01-29T19:06:53.694975+00:00","context":{"id":"820c2e740f8d456b96a4a53454a3e321","parent_id":null,"user_id":null}},"group.all_devices":{"entity_id":"group.all_devices","state":"unknown","attributes":{"entity_id":[],"order":2,"auto":true,"friendly_name":"all devices","hidden":true},"last_changed":"2020-01-29T18:06:27.511660+00:00","last_updated":"2020-01-29T18:06:27.511660+00:00","context":{"id":"92d561d3129f4f588c4993e62f19a158","parent_id":null,"user_id":null}},"device_tracker.carlos_soares_s_mi_9t":{"entity_id":"device_tracker.carlos_soares_s_mi_9t","state":"unknown","attributes":{"source_type":"gps","friendly_name":"Carlos Soares's Mi 9T"},"last_changed":"2020-01-29T18:06:27.526229+00:00","last_updated":"2020-01-29T18:06:27.526229+00:00","context":{"id":"ffbb24a57bec42edbed2c3a2b09f3615","parent_id":null,"user_id":null}},"weather.inicio":{"entity_id":"weather.inicio","state":"partlycloudy","attributes":{"temperature":12.7,"humidity":89,"pressure":1023.2,"wind_bearing":172.3,"wind_speed":20.2,"attribution":"Weather forecast from met.no, delivered by the Norwegian Meteorological Institute.","forecast":[{"datetime":"2020-01-30T12:00:00+00:00","temperature":13.9,"condition":"rainy","pressure":1022.3,"humidity":91.2,"wind_speed":24.8,"wind_bearing":176.6},{"datetime":"2020-01-31T12:00:00+00:00","temperature":16.1,"condition":"rainy","pressure":1022.9,"humidity":91.9,"wind_speed":18.7,"wind_bearing":196.9},{"datetime":"2020-02-01T12:00:00+00:00","temperature":16.3,"condition":"rainy","pressure":1025.4,"humidity":91.7,"wind_speed":15.8,"wind_bearing":217},{"datetime":"2020-02-02T12:00:00+00:00","temperature":17.7,"condition":"partlycloudy","pressure":1027.9,"humidity":79.2,"wind_speed":16.6,"wind_bearing":170.5},{"datetime":"2020-02-03T12:00:00+00:00","temperature":20.2,"condition":"sunny","pressure":1025,"humidity":65.4,"wind_speed":14.4,"wind_bearing":168.8}],"friendly_name":"Início"},"last_changed":"2020-01-29T23:00:33.299187+00:00","last_updated":"2020-01-29T23:00:33.299187+00:00","context":{"id":"40a49d4845394df2a0da01592cfc9b92","parent_id":null,"user_id":null}},"persistent_notification.notification":{"entity_id":"persistent_notification.notification","state":"notifying","attributes":{"message":"Light on"},"last_changed":"2020-01-29T18:06:36.048029+00:00","last_updated":"2020-01-29T18:06:36.048029+00:00","context":{"id":"18fc028348e143b980bb01d80df05688","parent_id":null,"user_id":null}},"persistent_notification.notification_2":{"entity_id":"persistent_notification.notification_2","state":"notifying","attributes":{"message":"Light on"},"last_changed":"2020-01-29T18:08:13.810090+00:00","last_updated":"2020-01-29T18:08:13.810090+00:00","context":{"id":"db25dd3659d845e98a9959134e05278d","parent_id":null,"user_id":null}},"persistent_notification.http_login":{"entity_id":"persistent_notification.http_login","state":"notifying","attributes":{"title":"Login attempt failed","message":"Login attempt or request with invalid authentication from 192.168.1.69"},"last_changed":"2020-01-29T21:52:26.506334+00:00","last_updated":"2020-01-29T21:52:26.506334+00:00","context":{"id":"891db4954e9a484e9054f3003479e07e","parent_id":null,"user_id":null}}};

var states={"light":["on","off"],"switch":["on","off"],"media_player":["playing","off","on","idle"]}


var VueDropControl = {
  props: ['readonly', 'emitter', 'ikey', 'getData', 'putData','idName','lista'],
  template: '<select id="${idName}" al-value="selectedId" @change= "change($event)" ><option></option><option v-for="item in lista">{{item}}</option></select>',
  data() {
    return {
      value: "",
    }
  },
  methods: {
    change(e){
      //console.log(e.target.value);
      this.value = e.target.value;
      this.update();
    },
    update() {
      if (this.ikey)
        this.putData(this.ikey, this.value)
      this.emitter.trigger('process');
    }
  },
  mounted() {
    this.value = this.getData(this.ikey);
  }
}

class DropControl extends Rete.Control {

  constructor(emitter, key, readonly,idName,lista) {
    
    super(key);
    this.component = VueDropControl;
    this.lista=lista;
    this.props = { emitter, ikey: key, readonly,idName,lista};
    
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}

var CustomNode = {
  template: `<div class="node" :class="[selected(), node.name] | kebab">
  <div class="title" style="text-align:center" >{{node.name}}</div> 
  <!-- Controls-->
  <div class="control" v-for="control in controls()" v-control="control"></div>
  <!-- Outputs-->
  <div style="float:right" class="output" v-for="output in outputs()" :key="output.key">
    <div class="output-title">{{output.name}}</div>
    <Socket v-socket:output="output" type="output" :socket="output.socket"></Socket>
  </div>
  <!-- Inputs-->
  <div class="input" v-for="input in inputs()" :key="input.key">
    <Socket v-socket:input="input" type="input" :socket="input.socket"></Socket>
    <div class="input-title" v-show="!input.showControl()">{{input.name}}</div>
    <div class="input-control" v-show="input.showControl()" v-control="input.control"></div>
  </div>
</div>`,
  mixins: [VueRenderPlugin.mixin],
  components: {
    Socket: VueRenderPlugin.Socket
  }
}

var ConditionNode = {
  template: `<div class="node" :class="[selected(), node.name] | kebab">
  <div class="title" style="text-align:center" >{{node.name}}
  
  </div> 
  <!-- Controls-->
  <div class="control" v-for="control in controls()" v-control="control"></div>
  <!-- Outputs-->
  <div style="float:right" class="output" v-for="output in outputs()" :key="output.key">
    <div class="output-title">{{output.name}}</div>
    <Socket v-socket:output="output" type="output" :socket="output.socket"></Socket>
  </div>
  <!-- Inputs-->
  <div class="input" v-for="input in inputs()" :key="input.key">
    <Socket v-socket:input="input" type="input" :socket="input.socket"></Socket>
    <div class="input-title" v-show="!input.showControl()">{{input.name}}</div>
    <div class="input-control" v-show="input.showControl()" v-control="input.control"></div>
  </div>
</div>`,
  mixins: [VueRenderPlugin.mixin],
  components: {
    Socket: VueRenderPlugin.Socket
  }
}

class LogicalComponent extends Rete.Component {
    
  constructor(name){
      super(name);
      this.data.component = CustomNode;
  }

  builder(node) {
    
      var out = new Rete.Output('out', "", socket,true);
      var inp = new Rete.Input('int', "", socket,true);
      
      return node.addOutput(out).addInput(inp);
  }

  worker(node, inputs, outputs) {
      
  }
}


class Component extends Rete.Component {
    
    constructor(name){
        super(name);
        this.data.component = CustomNode;
    }

    builder(node) {
      
      
      var lista =[];
      for (var k in ents){
         var friendly_name = ents[k]["attributes"]["friendly_name"]
          if(friendly_name == node.name){
            lista.push("--- AS TRIGGER ---")
            var entities=Object.keys(ents)
            var stt=Object.keys(states)
            for (var a in stt){
                var group = stt[a]
                console.log(ents[k]["entity_id"].split(".")[0])
                if(group==ents[k]["entity_id"].split(".")[0]){
                    states[ents[k]["entity_id"].split(".")[0]].forEach(element => {
                        lista.push(element)
                    });
                }
            }
            lista.push("--- AS ACTIONER ---")
            var ser=k.split(".")[0];
            for (var i=0;i<servs.length;i++){
              if (ser==servs[i].domain){
                for (var service in servs[i].services){
                  lista.push(service);
                }
              }
            }
            
          };
          
        }
       
       //console.log(lista)
        var out = new Rete.Output('out', "", socket);
        var in1 = new Rete.Input('int', "", socket,true);
        
        
        return node.addControl(new DropControl(this.editor, 'data',false, "drop",lista)).addOutput(out).addInput(in1);
    }

    worker(node, inputs, outputs) {
        outputs['out'] = node.data.num;
        
    }
}
update()

function update(){
  
  (async () => {
    components=[]
    
    devices.forEach(element => {
      components.push(new Component(element));
    });
    //components.push(new LogicalComponent("AND"),new LogicalComponent("OR"));
    
    var engine = new Rete.Engine('demo@0.1.0');
    
    components.map(c => {
        editor.register(c);
        engine.register(c);
    });

    editor.on('zoom', ({ source }) => {
    return source !== 'dblclick';
  });

    editor.on('process nodecreated noderemoved connectioncreated connectionremoved', async () => {
      
        await engine.abort();
        await engine.process(editor.toJSON());
        
    });

    editor.view.resize();
    
    AreaPlugin.zoomAt(editor);
    editor.trigger('process');
    
})();
}






