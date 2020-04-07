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
        document.getElementById('displayIsInClient').textContent = liff.isInClient();
    });
    document.getElementById('isLoggedInButton').addEventListener('click', function() {
        document.getElementById('displayIsLoggedIn').textContent = liff.isLoggedIn();
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
            document.getElementById('displayIsApiAvailable').textContent = 'No';
        }
    });
}