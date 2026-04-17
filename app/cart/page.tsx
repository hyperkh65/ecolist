'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import { useShopStore } from '@/lib/store';
import { useSiteSettings } from '@/lib/useSiteSettings';
import { supabase } from '@/lib/supabase';
import {
  ArrowRight,
  Banknote,
  CheckCircle2,
  ChevronRight,
  Copy,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
  Sparkles,
  FileText,
} from 'lucide-react';

type PaymentConfig = {
  bank_name?: string;
  bankName?: string;
  account_number?: string;
  accountNumber?: string;
  account_holder?: string;
  holderName?: string;
  notice?: string;
  memo?: string;
};

function money(value: number) {
  return new Intl.NumberFormat('ko-KR').format(Math.max(0, Math.round(value)));
}

function pickPayment(config: PaymentConfig | null) {
  return {
    bankName: config?.bank_name || config?.bankName || '관리자 설정 필요',
    accountNumber: config?.account_number || config?.accountNumber || '계좌번호를 입력하세요',
    holderName: config?.account_holder || config?.holderName || '(주)와이앤케이',
    notice:
      config?.notice ||
      config?.memo ||
      '카드/간편결제는 제공하지 않으며, 입금 확인 후 주문이 진행됩니다.',
  };
}

function CopyButton({
  text,
  label,
  copiedLabel = '복사됨',
  className,
}: {
  text: string;
  label: string;
  copiedLabel?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      onClick={handleCopy}
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {copied ? <CheckCircle2 size={16} /> : <Copy size={16} />}
      {copied ? copiedLabel : label}
    </button>
  );
}

export default function CartPage() {
  const settings = useSiteSettings();
  const cart = useShopStore((s) => s.cart);
  const removeFromCart = useShopStore((s) => s.removeFromCart);
  const updateQty = useShopStore((s) => s.updateQty);
  const clearCart = useShopStore((s) => s.clearCart);
  const cartTotal = useShopStore((s) => s.cartTotal());
  const cartCount = useShopStore((s) => s.cartCount());

  const [paymentConfig, setPaymentConfig] = useState<PaymentConfig | null>(null);
  const [payerName, setPayerName] = useState('');
  const [payerPhone, setPayerPhone] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    let alive = true;
    async function fetchPaymentConfig() {
      const { data } = await supabase
        .from('site_settings')
        .select('category, config')
        .in('category', ['payment', 'bank', 'transfer', 'settlement']);

      const row = data?.find((item) => item.config);
      if (alive && row?.config) {
        setPaymentConfig(row.config as PaymentConfig);
      }
    }

    fetchPaymentConfig();
    return () => {
      alive = false;
    };
  }, []);

  const companyName = settings?.company.name || '(주)와이앤케이';
  const companyPhone = settings?.company.tel || '032-862-1350';
  const companyEmail = settings?.company.email || 'contact@ynk2014.com';
  const payment = pickPayment(paymentConfig);

  const shipping = cartCount > 0 ? 0 : 0;
  const total = cartTotal + shipping;

  const transferText = useMemo(() => {
    const lines = [
      `[${companyName}] 계좌이체 주문`,
      `입금자명: ${payerName || '미입력'}`,
      `연락처: ${payerPhone || '미입력'}`,
      '',
      '주문 상품',
      ...cart.map((item) => `- ${item.product.name} x${item.quantity} (${money(item.product.price * item.quantity)}원)`),
      '',
      `상품금액: ${money(cartTotal)}원`,
      `배송비: ${money(shipping)}원`,
      `입금금액: ${money(total)}원`,
      '',
      `입금 계좌: ${payment.bankName} / ${payment.accountNumber} / ${payment.holderName}`,
      `메모: ${note || payment.notice}`,
    ];
    return lines.join('\n');
  }, [companyName, payerName, payerPhone, cart, cartTotal, shipping, total, payment.bankName, payment.accountNumber, payment.holderName, note, payment.notice]);

  const inquiryText = useMemo(() => {
    const lines = [
      '안녕하세요. 아래 주문으로 문의드립니다.',
      '',
      ...cart.map((item) => `- ${item.product.name} x${item.quantity}`),
      '',
      `입금자명: ${payerName || '미입력'}`,
      `연락처: ${payerPhone || '미입력'}`,
      `입금금액: ${money(total)}원`,
      `요청메모: ${note || '없음'}`,
    ];
    return lines.join('\n');
  }, [cart, payerName, payerPhone, note, total]);

  const bankLine = `${payment.bankName} · ${payment.accountNumber} · ${payment.holderName}`;
  const inquiryHref = `/support/contact?name=${encodeURIComponent(payerName)}&phone=${encodeURIComponent(payerPhone)}&content=${encodeURIComponent(inquiryText)}`;

  const hasItems = cart.length > 0;

  return (
    <main style={{ minHeight: '100vh', background: '#f6f8fc', color: '#0f172a', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 10% 10%, rgba(14,165,233,0.12), transparent 28%), radial-gradient(circle at 90% 0%, rgba(59,130,246,0.12), transparent 24%), radial-gradient(circle at 80% 85%, rgba(16,185,129,0.08), transparent 22%), linear-gradient(180deg, #f8fbff 0%, #f6f8fc 100%)' }} />
      <Navbar />

      <section style={{ position: 'relative', padding: '124px 24px 30px' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              borderRadius: 36,
              padding: '34px 32px',
              background: 'rgba(255,255,255,0.78)',
              backdropFilter: 'blur(18px)',
              border: '1px solid rgba(148,163,184,0.18)',
              boxShadow: '0 24px 70px rgba(15,23,42,0.08)',
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: 24,
              alignItems: 'center',
            }}
          >
            <div>
              <div className="section-label" style={{ marginBottom: 14 }}>Shopping Cart</div>
              <h1 style={{ fontSize: 'clamp(36px, 6vw, 66px)', fontWeight: 900, letterSpacing: '-0.06em', lineHeight: 1.02, marginBottom: 12 }}>
                담아둔 제품을
                <span style={{ display: 'block', color: 'var(--primary)' }}>주문으로 바꾸는 순간</span>
              </h1>
              <p style={{ maxWidth: 760, fontSize: 16, lineHeight: 1.8, color: '#475569' }}>
                결제는 계좌이체만 가능합니다. 제품을 담고, 입금자명만 입력하면
                바로 복사 가능한 주문 메모가 만들어져서 문의와 입금 안내가 한 번에 이어집니다.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 22 }}>
                {['계좌이체 전용', '입금 확인 후 출고', '문의 페이지 자동 연결'].map((badge) => (
                  <span
                    key={badge}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 7,
                      padding: '10px 14px',
                      borderRadius: 999,
                      background: 'rgba(14,165,233,0.08)',
                      border: '1px solid rgba(14,165,233,0.12)',
                      color: '#0369a1',
                      fontSize: 13,
                      fontWeight: 800,
                    }}
                  >
                    <Sparkles size={14} />
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div style={{ display: 'grid', gap: 12 }}>
              <div
                style={{
                  padding: '18px 20px',
                  borderRadius: 24,
                  background: 'linear-gradient(135deg, rgba(14,165,233,0.11), rgba(59,130,246,0.06))',
                  border: '1px solid rgba(14,165,233,0.12)',
                  boxShadow: '0 14px 30px rgba(14,165,233,0.08)',
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 800, color: '#0ea5e9', letterSpacing: 1.2, marginBottom: 8 }}>YOUR BASKET</div>
                <div style={{ display: 'grid', gap: 8 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14, color: '#334155' }}>
                    <span>장바구니</span>
                    <strong style={{ fontSize: 20, color: '#0f172a' }}>{cartCount}개</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14, color: '#334155' }}>
                    <span>상품금액</span>
                    <strong style={{ fontSize: 20, color: '#0f172a' }}>{money(cartTotal)}원</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 14, color: '#334155' }}>
                    <span>입금금액</span>
                    <strong style={{ fontSize: 20, color: '#0ea5e9' }}>{money(total)}원</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ position: 'relative', padding: '20px 24px 88px' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1.35fr) minmax(340px, 0.75fr)',
              gap: 28,
              alignItems: 'start',
            }}
          >
            <div style={{ display: 'grid', gap: 18 }}>
              <div
                style={{
                  padding: '20px 24px',
                  borderRadius: 26,
                  background: 'rgba(255,255,255,0.82)',
                  border: '1px solid rgba(148,163,184,0.16)',
                  boxShadow: '0 20px 50px rgba(15,23,42,0.06)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 16,
                  flexWrap: 'wrap',
                }}
              >
                <div>
                  <div style={{ fontSize: 12, letterSpacing: 2, fontWeight: 800, color: '#0ea5e9', marginBottom: 8 }}>ORDER LIST</div>
                  <h2 style={{ fontSize: 'clamp(24px, 3vw, 34px)', fontWeight: 900, letterSpacing: '-0.04em' }}>장바구니 상품</h2>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#64748b', fontSize: 14, fontWeight: 600 }}>
                  <Truck size={16} />
                  입금 확인 후 순차 출고
                </div>
              </div>

              {!hasItems ? (
                <div
                  style={{
                    padding: '56px 22px',
                    borderRadius: 30,
                    background: 'rgba(255,255,255,0.85)',
                    border: '1px solid rgba(148,163,184,0.16)',
                    boxShadow: '0 20px 50px rgba(15,23,42,0.06)',
                    textAlign: 'center',
                  }}
                >
                  <div style={{ width: 90, height: 90, borderRadius: '50%', margin: '0 auto 18px', display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg, rgba(14,165,233,0.14), rgba(59,130,246,0.08))', border: '1px solid rgba(14,165,233,0.15)' }}>
                    <ShoppingBag size={34} color="#0ea5e9" />
                  </div>
                  <div style={{ fontSize: 24, fontWeight: 900, marginBottom: 10, letterSpacing: '-0.04em' }}>카트가 비어 있어요</div>
                  <p style={{ maxWidth: 520, margin: '0 auto 24px', color: '#64748b', lineHeight: 1.8 }}>
                    마음에 드는 제품을 담으면 견적서처럼 정리되고, 계좌이체 안내와 문의 동선까지 한 번에 이어집니다.
                  </p>
                  <Link href="/shop" className="btn-primary">
                    제품 둘러보기 <ArrowRight size={16} />
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: 14 }}>
                  {cart.map((item, index) => {
                    const image = item.product.image || item.product.images?.[0];
                    return (
                      <div
                        key={item.product.id}
                        style={{
                          display: 'grid',
                          gridTemplateColumns: '126px minmax(0, 1fr) auto',
                          gap: 18,
                          padding: 18,
                          borderRadius: 26,
                          background: 'rgba(255,255,255,0.9)',
                          border: '1px solid rgba(148,163,184,0.15)',
                          boxShadow: '0 16px 40px rgba(15,23,42,0.06)',
                          animation: 'fadeInUp 0.45s ease forwards',
                          animationDelay: `${index * 65}ms`,
                          alignItems: 'center',
                        }}
                      >
                        <div
                          style={{
                            width: 126,
                            aspectRatio: '4 / 3',
                            borderRadius: 20,
                            overflow: 'hidden',
                            background: 'linear-gradient(135deg, rgba(14,165,233,0.12), rgba(59,130,246,0.08))',
                            border: '1px solid rgba(148,163,184,0.12)',
                          }}
                        >
                          {image ? (
                            <img src={image} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', fontSize: 28 }}>💡</div>
                          )}
                        </div>

                        <div style={{ minWidth: 0 }}>
                          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                            <span className="tag" style={{ background: 'rgba(14,165,233,0.1)', color: '#0369a1' }}>{item.product.category}</span>
                            {item.product.badge && <span className="tag" style={{ background: 'rgba(16,185,129,0.1)', color: '#059669' }}>{item.product.badge}</span>}
                          </div>
                          <Link href={`/shop/${item.product.id}`} style={{ color: '#0f172a', textDecoration: 'none', fontSize: 22, fontWeight: 900, letterSpacing: '-0.04em', display: 'inline-block', marginBottom: 8 }}>
                            {item.product.name}
                          </Link>
                          <p style={{ color: '#64748b', lineHeight: 1.75, fontSize: 14, marginBottom: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                            {item.product.description}
                          </p>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                            <div style={{ fontSize: 15, color: '#475569' }}>
                              단가 <strong style={{ color: '#0f172a' }}>{money(item.product.price)}원</strong>
                            </div>
                            <div style={{ width: 1, height: 14, background: '#e2e8f0' }} />
                            <button
                              onClick={() => removeFromCart(item.product.id)}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#ef4444',
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: 6,
                                fontSize: 13,
                                fontWeight: 700,
                                padding: 0,
                              }}
                            >
                              <Trash2 size={14} />
                              삭제
                            </button>
                          </div>
                        </div>

                        <div style={{ display: 'grid', justifyItems: 'end', gap: 12 }}>
                          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 16, background: '#f8fafc', border: '1px solid #e2e8f0' }}>
                            <button
                              onClick={() => updateQty(item.product.id, Math.max(0, item.quantity - 1))}
                              style={{ width: 34, height: 34, borderRadius: 12, border: '1px solid #e2e8f0', background: '#fff', color: '#0f172a', cursor: 'pointer' }}
                            >
                              <Minus size={16} />
                            </button>
                            <div style={{ minWidth: 28, textAlign: 'center', fontWeight: 900, fontSize: 18 }}>{item.quantity}</div>
                            <button
                              onClick={() => updateQty(item.product.id, item.quantity + 1)}
                              style={{ width: 34, height: 34, borderRadius: 12, border: '1px solid #e2e8f0', background: '#fff', color: '#0f172a', cursor: 'pointer' }}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <div style={{ fontSize: 12, color: '#64748b', marginBottom: 4 }}>소계</div>
                            <div style={{ fontSize: 24, fontWeight: 900, color: '#0284c7', letterSpacing: '-0.03em' }}>{money(item.product.price * item.quantity)}원</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <aside style={{ position: 'sticky', top: 96, display: 'grid', gap: 16 }}>
              <div
                style={{
                  padding: 24,
                  borderRadius: 28,
                  background: 'rgba(255,255,255,0.92)',
                  border: '1px solid rgba(148,163,184,0.16)',
                  boxShadow: '0 20px 50px rgba(15,23,42,0.08)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: 1.6, color: '#0ea5e9', marginBottom: 6 }}>CHECKOUT</div>
                    <h3 style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.04em' }}>계좌이체로 바로 주문</h3>
                  </div>
                  <div style={{ width: 46, height: 46, borderRadius: 16, display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg, rgba(14,165,233,0.12), rgba(59,130,246,0.08))', border: '1px solid rgba(14,165,233,0.12)' }}>
                    <Banknote size={20} color="#0ea5e9" />
                  </div>
                </div>

                <div style={{ padding: 18, borderRadius: 22, background: 'linear-gradient(135deg, rgba(14,165,233,0.08), rgba(59,130,246,0.05))', border: '1px solid rgba(14,165,233,0.12)', marginBottom: 16 }}>
                  <div style={{ fontSize: 12, color: '#0284c7', fontWeight: 800, letterSpacing: 1.1, marginBottom: 8 }}>입금 계좌</div>
                  <div style={{ fontSize: 17, fontWeight: 900, lineHeight: 1.4, marginBottom: 8 }}>{bankLine}</div>
                  <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.7 }}>{payment.notice}</div>
                </div>

                <div style={{ display: 'grid', gap: 12, marginBottom: 16 }}>
                  <label style={{ display: 'grid', gap: 8 }}>
                    <span style={{ fontSize: 12, color: '#64748b', fontWeight: 700 }}>입금자명</span>
                    <input
                      value={payerName}
                      onChange={(e) => setPayerName(e.target.value)}
                      placeholder="예: 홍길동"
                      style={{ width: '100%', background: '#fff', border: '1px solid #dbe3ee', color: '#0f172a', borderRadius: 14, padding: '13px 14px', outline: 'none', fontFamily: 'inherit' }}
                    />
                  </label>
                  <label style={{ display: 'grid', gap: 8 }}>
                    <span style={{ fontSize: 12, color: '#64748b', fontWeight: 700 }}>연락처</span>
                    <input
                      value={payerPhone}
                      onChange={(e) => setPayerPhone(e.target.value)}
                      placeholder="예: 010-1234-5678"
                      style={{ width: '100%', background: '#fff', border: '1px solid #dbe3ee', color: '#0f172a', borderRadius: 14, padding: '13px 14px', outline: 'none', fontFamily: 'inherit' }}
                    />
                  </label>
                  <label style={{ display: 'grid', gap: 8 }}>
                    <span style={{ fontSize: 12, color: '#64748b', fontWeight: 700 }}>요청 메모</span>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="배송 요청사항, 납기, 세금계산서 등"
                      rows={4}
                      style={{ width: '100%', background: '#fff', border: '1px solid #dbe3ee', color: '#0f172a', borderRadius: 14, padding: '13px 14px', outline: 'none', resize: 'vertical', fontFamily: 'inherit' }}
                    />
                  </label>
                </div>

                <div style={{ display: 'grid', gap: 10, marginBottom: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', fontSize: 14 }}>
                    <span>상품금액</span>
                    <strong>{money(cartTotal)}원</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#475569', fontSize: 14 }}>
                    <span>배송비</span>
                    <strong>{money(shipping)}원</strong>
                  </div>
                  <div style={{ height: 1, background: '#e2e8f0' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ color: '#334155', fontSize: 14, fontWeight: 700 }}>총 입금 금액</span>
                    <strong style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.04em', color: '#0ea5e9' }}>{money(total)}원</strong>
                  </div>
                </div>

                <CopyButton text={transferText} label="입금 메모 복사" className="btn-primary" />

                <div style={{ marginTop: 14, display: 'grid', gap: 10 }}>
                  <Link href={inquiryHref} className="btn-secondary" style={{ justifyContent: 'center', background: 'rgba(14,165,233,0.08)', color: '#0284c7', borderColor: 'rgba(14,165,233,0.16)' }}>
                    주문 문의하기 <ArrowRight size={16} />
                  </Link>
                  <Link href="/shop" className="btn-secondary" style={{ justifyContent: 'center', background: '#fff', color: '#0f172a' }}>
                    쇼핑 계속하기 <ChevronRight size={16} />
                  </Link>
                  <button
                    onClick={clearCart}
                    disabled={!hasItems}
                    className="btn-secondary"
                    style={{
                      justifyContent: 'center',
                      background: '#fff',
                      color: hasItems ? '#0f172a' : '#94a3b8',
                      cursor: hasItems ? 'pointer' : 'not-allowed',
                      opacity: hasItems ? 1 : 0.6,
                    }}
                  >
                    장바구니 비우기
                  </button>
                </div>
              </div>

              <div
                style={{
                  padding: 20,
                  borderRadius: 24,
                  background: 'rgba(255,255,255,0.88)',
                  border: '1px solid rgba(148,163,184,0.16)',
                  boxShadow: '0 18px 40px rgba(15,23,42,0.06)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, fontSize: 14, fontWeight: 900 }}>
                  <FileText size={16} color="#0ea5e9" />
                  왜 계좌이체만?
                </div>
                <div style={{ fontSize: 13, color: '#475569', lineHeight: 1.75 }}>
                  B2B 납품과 견적 확인이 많은 구조라, 결제는 계좌이체로 단순하게 유지하고
                  문의는 바로 상담 페이지로 연결되게 했습니다.
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
