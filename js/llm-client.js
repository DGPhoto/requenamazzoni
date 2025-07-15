// Gemma3 LLM Client
const Gemma3Client = {
    baseUrl: 'http://localhost:7860',

    // Send a request to the LLM
    async generate(text, options = {}) {
        try {
            const response = await fetch(`${this.baseUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: text,
                    ...options
                })
            });

            if (!response.ok) {
                throw new Error(`LLM request failed: ${response.status}`);
            }

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error communicating with Gemma3:', error);
            throw error;
        }
    },

    // Stream response from the LLM
    async* stream(text, options = {}) {
        try {
            const response = await fetch(`${this.baseUrl}/api/chat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: text,
                    stream: true,
                    ...options
                })
            });

            if (!response.ok) {
                throw new Error(`LLM request failed: ${response.status}`);
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { value, done } = await reader.read();
                if (done) break;
                
                const text = decoder.decode(value);
                yield text;
            }
        } catch (error) {
            console.error('Error streaming from Gemma3:', error);
            throw error;
        }
    }
};

// Export the client
export default Gemma3Client;
