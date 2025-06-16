/**
 * API configuration
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'
const WS_BASE_URL = import.meta.env.VITE_WS_BASE_URL || 'ws://localhost:8000'

// Determine if we should use secure WebSocket based on the current protocol
const getSecureWebSocketUrl = (baseUrl: string) => {
  // If we're on HTTPS, use WSS; if HTTP, use WS
  if (typeof window !== 'undefined') {
    const isSecure = window.location.protocol === 'https:'
    if (isSecure) {
      return baseUrl.replace('ws://', 'wss://').replace('http://', 'https://')
    }
  }
  return baseUrl
}

const SECURE_WS_BASE_URL = getSecureWebSocketUrl(WS_BASE_URL)

export const API_ENDPOINTS = {
  EXTRACTION_START: `${API_BASE_URL}/api/v1/extraction/start`,
  EXTRACTION_STATUS: (sessionId: string) => `${API_BASE_URL}/api/v1/extraction/${sessionId}/status`,
  EXTRACTION_PREVIEW: (sessionId: string) => `${API_BASE_URL}/api/v1/extraction/${sessionId}/preview`,
  EXTRACTION_DOWNLOAD: (sessionId: string) => `${API_BASE_URL}/api/v1/extraction/${sessionId}/download`,
  WEBSOCKET_EXTRACTION: (sessionId: string) => `${SECURE_WS_BASE_URL}/api/v1/ws/extraction/${sessionId}`,
}

export { API_BASE_URL, WS_BASE_URL, SECURE_WS_BASE_URL } 