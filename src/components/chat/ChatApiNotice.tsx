import type { OfflineNoticeKind } from '../../types';

type Props = {
  kind: OfflineNoticeKind;
  ar?: boolean;
};

export function ChatApiNotice({ kind, ar = false }: Props) {
  const billing = kind === 'billing';

  return (
    <div className="chat-api-notice" role="status">
      <span className="chat-api-notice__icon" aria-hidden>
        ⚠️
      </span>
      <div className="chat-api-notice__copy">
        <p className="chat-api-notice__title">
          {billing
            ? ar
              ? 'خدمة الذكاء الاصطناعي غير متاحة'
              : 'AI service unavailable'
            : ar
              ? 'خدمة الذكاء الاصطناعي غير متاحة مؤقتاً'
              : 'AI service temporarily unavailable'}
        </p>
        <p className="chat-api-notice__body">
          {billing ? (
            ar ? (
              <>
                يتم عرض إجابة من قاعدة المعرفة أدناه. أضف رصيداً من{' '}
                <a href="https://console.anthropic.com/settings/billing" target="_blank" rel="noopener noreferrer">
                  console.anthropic.com
                </a>
                .
              </>
            ) : (
              <>
                Showing a knowledge-base answer below. Add credits at{' '}
                <a href="https://console.anthropic.com/settings/billing" target="_blank" rel="noopener noreferrer">
                  console.anthropic.com
                </a>
                .
              </>
            )
          ) : ar ? (
            'يتم عرض إجابة من قاعدة المعرفة أدناه.'
          ) : (
            'Showing a knowledge-base answer below.'
          )}
        </p>
      </div>
    </div>
  );
}
