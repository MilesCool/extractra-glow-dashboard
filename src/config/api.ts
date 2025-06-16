/**
 * API configuration
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:8000'

export const API_ENDPOINTS = {
  EXTRACTION_START: `${API_BASE_URL}/api/v1/extraction/start`,
  EXTRACTION_STATUS: (sessionId: string) => `${API_BASE_URL}/api/v1/extraction/${sessionId}/status`,
  EXTRACTION_DOWNLOAD: (sessionId: string) => `${API_BASE_URL}/api/v1/extraction/${sessionId}/download`,
  WEBSOCKET_EXTRACTION: (sessionId: string) => `${WS_BASE_URL}/api/v1/ws/extraction/${sessionId}`,
}

export { API_BASE_URL, WS_BASE_URL } 