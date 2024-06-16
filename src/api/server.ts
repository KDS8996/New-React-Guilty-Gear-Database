let token = 'de941346ce253e62580a5a08b6203c1b';

export const server_calls = {
    get: async () => {
        try {
            const response = await fetch(`https://new-flask-shell-guilty-gear-database.onrender.com/api/fighters`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const message = `An error has occurred: ${response.status} - ${response.statusText}`;
                throw new Error(message);
            }

            return await response.json();
        } catch (error) {
            console.error('Failed to fetch data from server:', error);
            throw error;
        }
    },

    create: async (data: any = {}) => {
        try {
            const response = await fetch(`https://new-flask-shell-guilty-gear-database.onrender.com/api/fighters`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const message = `An error has occurred: ${response.status} - ${response.statusText}`;
                throw new Error(message);
            }

            return await response.json();
        } catch (error) {
            console.error('Failed to create new fighter on server:', error);
            throw error;
        }
    },

    update: async (id: string, data: any = {}) => {
        try {
            const response = await fetch(`https://new-flask-shell-guilty-gear-database.onrender.com/api/fighters/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                const message = `Failed to update fighter on server with status: ${response.status} - ${response.statusText}`;
                throw new Error(message);
            }

            return await response.json();
        } catch (error) {
            console.error(`Failed to update fighter with ID: ${id}:`, error);
            throw error;
        }
    },

    delete: async (id: string) => {
        try {
            const response = await fetch(`https://new-flask-shell-guilty-gear-database.onrender.com/api/fighters/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                const message = `Failed to delete fighter from server with status: ${response.status} - ${response.statusText}`;
                throw new Error(message);
            }

            // Usually DELETE responses don't return a body
            return { success: true };
        } catch (error) {
            console.error(`Failed to delete fighter with ID: ${id}:`, error);
            throw error;
        }
    }
}