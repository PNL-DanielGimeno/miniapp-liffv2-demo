window.onload = function() {
    const useNodeJS = true;
    const defaultLiffId = "";

    let myLiffId = "";

    if (useNodeJS) {
        fetch('/send-id')
            .then(function(reqResponse) {
                return reqResponse.json();
            })
            .then(function(jsonResponse) {
                myLiffId = jsonResponse.id;
                initializeLiffOrDie(myLiffId);
            })
            .catch(function(error) {
                document.getElementById('liffAppContent').classList.add('hidden');
                document.getElementById('nodeLiffIdErrorMessage').classList.remove('hidden');
                document.getElementById('nodeLiffIdErrorMessage').textContent = 'tried to initialize and died';
            });
    } else {
        myLiffId = defaultLiffId;
        initializeLiffOrDie(myLiffId);
    }
};

function initializeLiffOrDie(myLiffId) {
    if (!myLiffId) {
        document.getElementById('liffAppContent').classList.add('hidden');
        document.getElementById('nodeLiffIdErrorMessage').classList.remove('hidden');
        document.getElementById('nodeLiffIdErrorMessage').classList.textContent = 'myLiffId null';
    } else {
        initializeLiff(myLiffId);
    }
}

function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            initializeApp();
        })
        .catch((err) => {
            document.getElementById('liffAppContent').classList.add('hidden');
            document.getElementById('nodeLiffIdErrorMessage').classList.remove('hidden');
            document.getElementById('nodeLiffIdErrorMessage').textContent = 'initLiff fail';
        });
}

function initializeApp() {
    registerButtonHandlers();
}

function registerButtonHandlers() {
    document.getElementById('getOSButton').addEventListener('click', function() {
        document.getElementById('displayOS').textContent = liff.getOS();
    });
    document.getElementById('getLanguageButton').addEventListener('click', function() {
        document.getElementById('displayLanguage').textContent = liff.getLanguage();
    });
    document.getElementById('getVersionButton').addEventListener('click', function() {
        document.getElementById('displayVersion').textContent = liff.getVersion();
    });
    document.getElementById('isInClientButton').addEventListener('click', function() {
        document.getElementById('displayInClient').textContent = liff.isInClient();
    });
    document.getElementById('isLoggedInButton').addEventListener('click', function() {
        document.getElementById('displayLoggedIn').textContent = liff.isLoggedIn();
    });
    document.getElementById('isApiAvailableButton').addEventListener('click', function() {
        if (liff.isApiAvailable('shareTargetPicker')){
            liff.shareTargetPicker([
                {
                    type: "text",
                    text: "Hello, World!"
                }
            ])
                .then(
                    alert('ShareTargetPicker was launched')
                ).catch(function(res) {
                    alert('Failed to launch ShareTargetPicker')
                })
        } else {
            document.getElementById('displayApiAvailable').textContent = 'No';
        }
    });
    document.getElementById('getAccessTokenButton').addEventListener('click', function() {
        const accessToken = liff.getAccessToken();
        if (accessToken) {
            fetch('https://api...', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: 'Bearer ${accessToken}'
                }
            });
        }
        document.getElementById('displayAccessToken').textContent = String(accessToken);
    });
    document.getElementById('getContextDivButton').addEventListener('click', function() {
        const context = liff.getContext();
        if (!context) {
            document.getElementById('displayContext').textContent = String(context);
        } else {
            document.getElementById('displayContextType').textContent = 'Type: ' + context.type;
            document.getElementById('displayContextViewType').textContent = 'View Type: ' + context.viewType;
            document.getElementById('displayContextUserId').textContent = 'User ID: ' + context.userId;
            document.getElementById('displayContextUtouId').textContent = 'utou ID: ' + context.utouId;
            document.getElementById('displayContextRoomId').textContent = 'Room ID: ' + context.roomId;
            document.getElementById('displayContextGroupId').textContent = 'Group ID: ' + context.groupId;
        }
    });
    document.getElementById('getDecodedIdTokenButton').addEventListener('click', function() {
        const decodedIDToken = liff.getDecodedIDToken();

        if (!decodedIDToken) {
            document.getElementById('displayDecodedIdToken').textContent = String(decodedIDToken);
        } else {
            document.getElementById('displayDecodedIdTokenIss').textContent = "iss: " + decodedIDToken.iss;
            document.getElementById('displayDecodedIdTokenSub').textContent = "sub: " + decodedIDToken.sub;
            document.getElementById('displayDecodedIdTokenAud').textContent = "aud: " + decodedIDToken.aud;
            document.getElementById('displayDecodedIdTokenExp').textContent = "exp: " + decodedIDToken.exp;
            document.getElementById('displayDecodedIdTokenIat').textContent = "iat: " + decodedIDToken.iat;
            document.getElementById('displayDecodedIdTokenNonce').textContent = "nonce: " + decodedIDToken.nonce;
            document.getElementById('displayDecodedIdTokenAmr').textContent = "amr: " + decodedIDToken.amr;
            document.getElementById('displayDecodedIdTokenName').textContent = "name: " + decodedIDToken.name;
            document.getElementById('displayDecodedIdTokenPictureUrl').textContent = "Pic URL: " + decodedIDToken.picture;
            document.getElementById('displayDecodedIdTokenPicture').src = decodedIDToken.picture;
        }
    });
    document.getElementById('getProfileButton').addEventListener('click', function() {
        liff.getProfile()
            .then(function (profile) {
                if (!profile) {
                    document.getElementById('displayProfile').textContent = String(profile);
                } else {
                    document.getElementById('displayProfileUserId').textContent = 'User ID: ' + profile.userId;
                    document.getElementById('displayProfileDisplayName').textContent = 'Display Name: ' + profile.displayName;
                    document.getElementById('displayProfileStatusMessage').textContent = 'Text Content: ' + profile.statusMessage;
                    document.getElementById('displayProfilePictureUrl').textContent = 'ProPic URL: ' + profile.pictureUrl;
                    document.getElementById('displayProfilePicture').src = profile.pictureUrl;
                }
            })
            .catch(function(err) {
                document.getElementById('displayProfile').textContent = "Error getting profile: " + err;
            });
    });
    document.getElementById('getFriendshipButton').addEventListener('click', function() {
        liff.getFriendship()
            .then(function (data) {
                document.getElementById('displayFriendship') = 'Friendship: ' + data.friendFlag;
            })
            .catch(function(err) {
                document.getElementById('displayFriendship').textContent = 'Error getting friendship'
            });
    });
    document.getElementById('sendMessagesButton').addEventListener('click', function() {
        const messageContent = document.getElementById('sendMessagesInput').value;
        liff.sendMessages([
            {
                type: 'text',
                text: messageContent
            }
        ])
        .then(function() {
            document.getElementById('sendMessagesConf').textContent = 'message sent';
        })
        .catch(function(err) {
            document.getElementById('sendMessagesConf').textContent = 'message send error: ' + err;
        });
    });
    document.getElementById('openWindowButton').addEventListener('click', function() {
        const openWindowUrl = document.getElementById('openWindowInput').value;
        liff.openWindow({
            url: openWindowUrl,
            external: false
        });
    });
    document.getElementById('scanCodeButton').addEventListener('click', function() {
        if (liff.scanCode) {
            liff.scanCode().then(function(result) {
                document.getElementById('displayScanCode').textContent = result.value;
                return result.value;
            })
            .then(function(value) {
                if (!(!value))　{
                    liff.openWindow({
                        url: value,
                        external: false
                    }):
                }
            });
        } else {
            document.getElementById('displayScanCode').textContent = 'qr scan unavailable'
        }
    });
}