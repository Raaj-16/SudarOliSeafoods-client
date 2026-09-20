const configuredApiUrl = import.meta.env.VITE_API_BASE_URL?.trim() || ''
const isLocalDevelopment = import.meta.env.DEV

export const API_BASE_URL = configuredApiUrl || (isLocalDevelopment ? 'http://localhost:4000' : '')
export const WHATSAPP_NUMBER = '916379386564'

export function isSecureApiUrl(url = API_BASE_URL) {
	try {
		const parsed = new URL(url)
		return parsed.protocol === 'https:' || (isLocalDevelopment && ['localhost', '127.0.0.1'].includes(parsed.hostname))
	} catch {
		return false
	}
}
