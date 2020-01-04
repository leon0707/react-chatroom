import config from 'config';

const apiUrl = config.apiUrl;

export function signIn(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ username, password }),
        mode: 'cors'
    };

    return fetch(`${apiUrl}/signin`, requestOptions)
        .then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                // logout();
                // location.reload(true);
            }

            const errorMessage = (data && data.errorMessage) || response.statusText;
            return Promise.reject(Error(errorMessage));
        }

        localStorage.setItem('jwt', data['jwt']);
        return data;
    });
}
