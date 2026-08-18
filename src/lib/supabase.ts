import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/**
 * O cliente só é criado quando as variáveis de ambiente existem.
 * Assim o site continua funcionando (com fallback para e-mail) sem Supabase configurado.
 */
export const supabase: SupabaseClient | null =
  url && anonKey ? createClient(url, anonKey, { auth: { persistSession: false } }) : null

export const isSupabaseConfigured = supabase !== null

export type ContactPayload = {
  name: string
  email: string
  company?: string
  message: string
}

export type ContactResult = { ok: true; persisted: boolean } | { ok: false; error: string }

export async function submitContact(payload: ContactPayload): Promise<ContactResult> {
  if (!supabase) {
    return { ok: true, persisted: false }
  }

  const { error } = await supabase.from('contact_messages').insert({
    name: payload.name.trim(),
    email: payload.email.trim().toLowerCase(),
    company: payload.company?.trim() || null,
    message: payload.message.trim(),
    source: 'portfolio',
  })

  if (error) {
    return { ok: false, error: error.message }
  }

  return { ok: true, persisted: true }
}
