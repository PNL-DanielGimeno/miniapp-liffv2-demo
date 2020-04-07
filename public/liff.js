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
            document.getElementById('displayContextType').textContent = context.type;
            document.getElementById('displayContextViewType').textContent = context.viewType;
            document.getElementById('displayContextUserId').textContent = context.userId;
            document.getElementById('displayContextUtouId').textContent = context.utouId;
            document.getElementById('displayContextRoomId').textContent = context.roomId;
            document.getElementById('displayContextGroupId').textContent = context.groupId;
        }
    });
}