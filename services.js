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

var ents=

window.entities=ents