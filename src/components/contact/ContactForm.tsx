import { useState, type FormEvent } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input, Label, Textarea } from '@/components/ui/input'
import { submitContact } from '@/lib/supabase'
import { profile } from '@/data/site'

type Fields = { name: string; email: string; company: string; message: string }
type Errors = Partial<Record<keyof Fields, string>>
type Status = 'idle' | 'sending' | 'success' | 'error'

const emptyForm: Fields = { name: '', email: '', company: '', message: '' }

function validate(fields: Fields): Errors {
  const errors: Errors = {}

  if (fields.name.trim().length < 2) errors.name = 'Informe seu nome.'
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(fields.email.trim()))
    errors.email = 'Informe um e-mail válido.'
  if (fields.message.trim().length < 10)
    errors.message = 'Escreva pelo menos 10 caracteres sobre o processo ou projeto.'

  return errors
}

export function ContactForm() {
  const [fields, setFields] = useState<Fields>(emptyForm)
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [feedback, setFeedback] = useState('')

  const update = (key: keyof Fields) => (event: { target: { value: string } }) => {
    setFields((prev) => ({ ...prev, [key]: event.target.value }))
    setErrors((prev) => ({ ...prev, [key]: undefined }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const validationErrors = validate(fields)
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      setStatus('idle')
      return
    }

    setStatus('sending')

    const result = await submitContact({
      name: fields.name,
      email: fields.email,
      company: fields.company,
      message: fields.message,
    })

    if (!result.ok) {
      setStatus('error')
      setFeedback(
        'Não foi possível enviar agora. Você pode falar comigo direto pelo e-mail abaixo.',
      )
      return
    }

    // Sem Supabase configurado, o envio cai para o cliente de e-mail
    // em vez de descartar a mensagem silenciosamente.
    if (!result.persisted) {
      const subject = encodeURIComponent(`Contato pelo portfólio — ${fields.name.trim()}`)
      const body = encodeURIComponent(
        [
          `Nome: ${fields.name.trim()}`,
          `E-mail: ${fields.email.trim()}`,
          fields.company.trim() ? `Empresa: ${fields.company.trim()}` : null,
          '',
          fields.message.trim(),
        ]
          .filter(Boolean)
          .join('\n'),
      )
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    }

    setStatus('success')
    setFeedback('Mensagem enviada com sucesso! Em breve entrarei em contato.')
    setFields(emptyForm)
  }

  const sending = status === 'sending'

  return (
    <form onSubmit={handleSubmit} noValidate className="card-surface p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="contato-nome">Nome *</Label>
          <Input
            id="contato-nome"
            name="name"
            autoComplete="name"
            placeholder="Seu nome"
            value={fields.name}
            onChange={update('name')}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'erro-nome' : undefined}
            disabled={sending}
          />
          {errors.name && (
            <p id="erro-nome" className="mt-1.5 text-[12.5px] text-red-400">
              {errors.name}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="contato-email">E-mail *</Label>
          <Input
            id="contato-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="voce@empresa.com"
            value={fields.email}
            onChange={update('email')}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'erro-email' : undefined}
            disabled={sending}
          />
          {errors.email && (
            <p id="erro-email" className="mt-1.5 text-[12.5px] text-red-400">
              {errors.email}
            </p>
          )}
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="contato-empresa">Empresa</Label>
          <Input
            id="contato-empresa"
            name="company"
            autoComplete="organization"
            placeholder="Opcional"
            value={fields.company}
            onChange={update('company')}
            disabled={sending}
          />
        </div>

        <div className="sm:col-span-2">
          <Label htmlFor="contato-mensagem">Mensagem *</Label>
          <Textarea
            id="contato-mensagem"
            name="message"
            placeholder="Conte qual processo você gostaria de automatizar ou qual problema quer resolver."
            value={fields.message}
            onChange={update('message')}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'erro-mensagem' : undefined}
            disabled={sending}
          />
          {errors.message && (
            <p id="erro-mensagem" className="mt-1.5 text-[12.5px] text-red-400">
              {errors.message}
            </p>
          )}
        </div>
      </div>

      <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <Button type="submit" size="lg" disabled={sending} className="group w-full sm:w-auto">
          {sending ? (
            <>
              <Loader2 className="animate-spin" />
              Enviando...
            </>
          ) : (
            <>
              Enviar mensagem
              <Send className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </>
          )}
        </Button>

        <p className="text-[12.5px] text-ink-muted/70">
          Prefere e-mail?{' '}
          <a
            href={profile.links.email}
            className="text-brand-500 underline-offset-4 hover:text-brand-400 hover:underline"
          >
            {profile.email}
          </a>
        </p>
      </div>

      {/* feedback */}
      <AnimatePresence mode="wait">
        {(status === 'success' || status === 'error') && (
          <motion.div
            key={status}
            role="status"
            aria-live="polite"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className={
              'mt-6 flex items-start gap-3 rounded-xl border p-4 text-[13.5px] leading-relaxed ' +
              (status === 'success'
                ? 'border-emerald-500/30 bg-emerald-500/[.07] text-emerald-300'
                : 'border-red-500/30 bg-red-500/[.07] text-red-300')
            }
          >
            {status === 'success' ? (
              <CheckCircle2 className="mt-px size-4 shrink-0" />
            ) : (
              <AlertCircle className="mt-px size-4 shrink-0" />
            )}
            <span>{feedback}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}
