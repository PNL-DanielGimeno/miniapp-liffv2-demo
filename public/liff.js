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
                document.getElementById('nodeLiffIdErrorMessage').textContent += 'tried to initialize and died; ';
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
        document.getElementById('nodeLiffIdErrorMessage').classList.textContent += 'myLiffId null; ';
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
            document.getElementById('nodeLiffIdErrorMessage').textContent += 'initLiff failed; ';
        });
}

function initializeApp() {
    registerButtonHandlers()
        .catch((err) => {
            document.getElementById('liffAppContent').classList.add('hidden');
            document.getElementById('nodeLiffIdErrorMessage').classList.remove('hidden');
            document.getElementById('nodeLiffIdErrorMessage').textContent += 'register buttons failed; ';
        });
}

function registerButtonHandlers() {
    document.getElementById('getOSButton').addEventListener('click', function() {
        document.getElementById('displayOSDiv').textContent = liff.getOS();
    });
}