export const handleFeeds = async ({ search, source, topic }) => {
    try {
        const apiEndpoint = 'http://localhost/rss-feed-widgets-php-backend/index.php/feeds';
        const params = new URLSearchParams();

        if (search) {
            params.append('search', search);
        }
        if (source) {
            params.append('source', source);
        }
        if (topic) {
            params.append('topic', topic);
        }

        const url = `${apiEndpoint}?${params.toString()}`;
        
        // Log the URL for debugging
        console.log('Fetching from URL:', url);
        
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                // Add any authentication headers if needed
                // 'Authorization': `Bearer ${token}`,
            },
        });

        // Check if response is ok before trying to parse JSON
        if (!response.ok) {
            const errorText = await response.text();
            console.error('API Error Response:', errorText);
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        // Check content type to ensure it's JSON
        const contentType = response.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            const responseText = await response.text();
            console.error('Non-JSON response received:', responseText);
            throw new Error('Server returned non-JSON response');
        }

        return response;
    } catch (error) {
        console.error('Error in handleFeeds:', error);
        throw error;
    }
};