#!/bin/bash
taskkill -im "StreamDeck.exe" -f
sleep 1
"C:\Program Files\Elgato\StreamDeck\StreamDeck.exe" &
