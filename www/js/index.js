/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
        StatusBar.overlaysWebView(false);
        StatusBar.backgroundColorByHexString("#00ADEA");
        if(device.platform === 'iOS'){
            document.addEventListener('resign', this.onPause.bind(this), false);
            document.addEventListener('active', this.onResume.bind(this), false);
        }else{
            document.addEventListener('pause', this.onPause.bind(this), false);
            document.addEventListener('resume', this.onResume.bind(this), false);
        }
    },

    onPause: function () {
        // Handle the pause event
        document.getElementById("privacy-cover").classList.remove("disabled");
        document.getElementById("privacy-cover").classList.add("active");
        StatusBar.overlaysWebView(true);
    },
    
    onResume: function () {
        // Handle the resume event
        document.getElementById("privacy-cover").classList.remove("active");
        document.getElementById("privacy-cover").classList.add("disabled");
        StatusBar.overlaysWebView(false);
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },
};

app.initialize();