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
  FileText,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Trash2,
  Truck,
  CircleAlert,
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

  const bankLine = `${payment.bankName} · ${payment.accountNumber} · ${payment.holderName}`;

  return (
    <main style={{ minHeight: '100vh', background: '#050816', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 20% 20%, rgba(14,165,233,0.22), transparent 30%), radial-gradient(circle at 80% 0%, rgba(59,130,246,0.18), transparent 22%), radial-gradient(circle at 80% 80%, rgba(16,185,129,0.12), transparent 25%), linear-gradient(180deg, rgba(5,8,22,1) 0%, rgba(8,12,28,1) 100%)' }} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'linear-gradient(180deg, rgba(0,0,0,0.45), transparent 82%)',
        }}
      />
      <Navbar />

      <section style={{ position: 'relative', padding: '132px 24px 60px' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1.2fr 0.8fr',
              gap: 28,
              alignItems: 'stretch',
            }}
          >
            <div
              className="glass-panel"
              style={{
                padding: 32,
                borderRadius: 32,
                background: 'rgba(8,12,24,0.72)',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 30px 120px rgba(0,0,0,0.45)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', right: -60, top: -60, width: 220, height: 220, borderRadius: '50%', background: 'radial-gradient(circle, rgba(56,189,248,0.18), transparent 70%)', filter: 'blur(6px)' }} />
              <div style={{ position: 'absolute', left: -70, bottom: -70, width: 240, height: 240, borderRadius: '50%', background: 'radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)', filter: 'blur(8px)' }} />

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18, position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    width: 54,
                    height: 54,
                    borderRadius: 18,
                    display: 'grid',
                    placeItems: 'center',
                    background: 'linear-gradient(135deg, rgba(14,165,233,0.2), rgba(59,130,246,0.24))',
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 10px 30px rgba(14,165,233,0.18)',
                  }}
                >
                  <ShoppingBag size={26} />
                </div>
                <div>
                  <div style={{ fontSize: 12, letterSpacing: 2, fontWeight: 800, color: 'rgba(255,255,255,0.55)', marginBottom: 6 }}>
                    SHOPPING CART
                  </div>
                  <h1 style={{ fontSize: 'clamp(34px, 5vw, 62px)', fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 1.02, marginBottom: 8 }}>
                    결제는 오직
                    <span style={{ display: 'block', background: 'linear-gradient(135deg, #7dd3fc, #60a5fa 45%, #a78bfa)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                      계좌이체만
                    </span>
                  </h1>
                </div>
              </div>

              <p style={{ maxWidth: 740, color: 'rgba(255,255,255,0.7)', lineHeight: 1.8, fontSize: 16, marginBottom: 22, position: 'relative', zIndex: 1 }}>
                장바구니를 확인하고, 입금자명만 입력하면 바로 복사할 수 있는 주문 메모가 생성됩니다.
                카드 결제 없이 깔끔하게 계좌이체로만 진행되는, 쇼핑몰답게 정돈된 주문 경험을 만들었습니다.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, position: 'relative', zIndex: 1 }}>
                <span className="tag" style={{ background: 'rgba(14,165,233,0.16)', color: '#7dd3fc', border: '1px solid rgba(125,211,252,0.2)' }}>
                  <ShieldCheck size={14} style={{ display: 'inline', marginRight: 6 }} />
                  BANK TRANSFER ONLY
                </span>
                <span className="tag" style={{ background: 'rgba(16,185,129,0.12)', color: '#86efac', border: '1px solid rgba(134,239,172,0.18)' }}>
                  <Sparkles size={14} style={{ display: 'inline', marginRight: 6 }} />
                  입금 안내 자동 생성
                </span>
                <span className="tag" style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <Truck size={14} style={{ display: 'inline', marginRight: 6 }} />
                  입금 확인 후 발송
                </span>
              </div>

              <div
                style={{
                  marginTop: 28,
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                  gap: 14,
                  position: 'relative',
                  zIndex: 1,
                }}
              >
                {[
                  { label: '상품 수', value: `${cartCount}개` },
                  { label: '상품금액', value: `${money(cartTotal)}원` },
                  { label: '입금금액', value: `${money(total)}원` },
                ].map((item) => (
                  <div
                    key={item.label}
                    style={{
                      padding: '18px 18px 16px',
                      borderRadius: 20,
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.48)', marginBottom: 8, fontWeight: 700 }}>{item.label}</div>
                    <div style={{ fontSize: 24, fontWeight: 900, letterSpacing: '-0.04em' }}>{item.value}</div>
                  </div>
                ))}
              </div>
            </div>

            <div
              className="glass-panel"
              style={{
                padding: 24,
                borderRadius: 32,
                background: 'linear-gradient(180deg, rgba(9,14,28,0.92), rgba(13,18,34,0.88))',
                border: '1px solid rgba(255,255,255,0.08)',
                boxShadow: '0 24px 80px rgba(0,0,0,0.4)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{ position: 'absolute', inset: -2, borderRadius: 32, background: 'radial-gradient(circle at 20% 20%, rgba(96,165,250,0.18), transparent 28%), radial-gradient(circle at 85% 25%, rgba(34,197,94,0.12), transparent 24%)', pointerEvents: 'none' }} />
              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
                  <div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', letterSpacing: 1.6, fontWeight: 800, marginBottom: 6 }}>TRANSFER DASHBOARD</div>
                    <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: '-0.04em' }}>주문 요약</div>
                  </div>
                  <div style={{ width: 44, height: 44, borderRadius: 16, display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <Banknote size={20} />
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 18px', borderRadius: 20, background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', marginBottom: 16 }}>
                  <div>
                    <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 6 }}>결제 방식</div>
                    <div style={{ fontSize: 16, fontWeight: 800 }}>계좌이체 전용</div>
                  </div>
                  <ShieldCheck size={20} color="#7dd3fc" />
                </div>

                <div style={{ display: 'grid', gap: 12, marginBottom: 18 }}>
                  <label style={{ display: 'grid', gap: 8 }}>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>입금자명</span>
                    <input
                      className="input-dark"
                      value={payerName}
                      onChange={(e) => setPayerName(e.target.value)}
                      placeholder="예: 홍길동"
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: '#fff',
                        borderRadius: 16,
                        padding: '13px 16px',
                        outline: 'none',
                      }}
                    />
                  </label>
                  <label style={{ display: 'grid', gap: 8 }}>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>연락처</span>
                    <input
                      className="input-dark"
                      value={payerPhone}
                      onChange={(e) => setPayerPhone(e.target.value)}
                      placeholder="예: 010-1234-5678"
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: '#fff',
                        borderRadius: 16,
                        padding: '13px 16px',
                        outline: 'none',
                      }}
                    />
                  </label>
                  <label style={{ display: 'grid', gap: 8 }}>
                    <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>요청 메모</span>
                    <textarea
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      placeholder="배송 요청사항, 납기, 세금계산서 등"
                      rows={4}
                      style={{
                        width: '100%',
                        background: 'rgba(255,255,255,0.05)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        color: '#fff',
                        borderRadius: 16,
                        padding: '13px 16px',
                        outline: 'none',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                      }}
                    />
                  </label>
                </div>

                <div
                  style={{
                    padding: 18,
                    borderRadius: 22,
                    background: 'linear-gradient(135deg, rgba(14,165,233,0.12), rgba(59,130,246,0.08))',
                    border: '1px solid rgba(125,211,252,0.16)',
                    marginBottom: 16,
                  }}
                >
                  <div style={{ fontSize: 12, color: 'rgba(125,211,252,0.8)', fontWeight: 800, letterSpacing: 1.2, marginBottom: 8 }}>입금 계좌</div>
                  <div style={{ fontSize: 17, fontWeight: 900, lineHeight: 1.4, marginBottom: 8 }}>{bankLine}</div>
                  <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.68)', lineHeight: 1.6 }}>{payment.notice}</div>
                  <div style={{ marginTop: 14 }}>
                    <CopyButton
                      text={bankLine}
                      label="계좌 정보 복사"
                      className="btn-primary"
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gap: 10, marginBottom: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.66)', fontSize: 14 }}>
                    <span>상품금액</span>
                    <strong style={{ color: '#fff' }}>{money(cartTotal)}원</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'rgba(255,255,255,0.66)', fontSize: 14 }}>
                    <span>배송비</span>
                    <strong style={{ color: '#fff' }}>{money(shipping)}원</strong>
                  </div>
                  <div style={{ height: 1, background: 'rgba(255,255,255,0.08)' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ color: 'rgba(255,255,255,0.72)', fontSize: 14, fontWeight: 700 }}>총 입금 금액</span>
                    <strong style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.04em', color: '#7dd3fc' }}>{money(total)}원</strong>
                  </div>
                </div>

                <CopyButton
                  text={transferText}
                  label="입금 메모 복사"
                  className="btn-primary"
                />

                <div style={{ marginTop: 14, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <Link href="/shop" className="btn-secondary" style={{ background: 'rgba(255,255,255,0.04)', color: '#fff', borderColor: 'rgba(255,255,255,0.08)' }}>
                    계속 쇼핑하기 <ChevronRight size={16} />
                  </Link>
                  <button
                    onClick={clearCart}
                    disabled={cartCount === 0}
                    className="btn-secondary"
                    style={{
                      background: cartCount === 0 ? 'rgba(255,255,255,0.03)' : 'rgba(255,255,255,0.04)',
                      color: cartCount === 0 ? 'rgba(255,255,255,0.35)' : '#fff',
                      borderColor: 'rgba(255,255,255,0.08)',
                      cursor: cartCount === 0 ? 'not-allowed' : 'pointer',
                    }}
                  >
                    장바구니 비우기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section style={{ position: 'relative', padding: '0 24px 90px' }}>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div
            className="glass-panel"
            style={{
              padding: 24,
              borderRadius: 30,
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              marginBottom: 24,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 18 }}>
              <div>
                <div className="section-label" style={{ color: '#7dd3fc', marginBottom: 10 }}>ORDER LIST</div>
                <h2 style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 900, letterSpacing: '-0.04em' }}>
                  장바구니 안의 모든 것
                </h2>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(255,255,255,0.65)', fontSize: 14 }}>
                <CircleAlert size={16} />
                결제는 계좌이체만 가능합니다
              </div>
            </div>

            {cart.length === 0 ? (
              <div
                style={{
                  padding: '54px 20px',
                  borderRadius: 24,
                  background: 'linear-gradient(135deg, rgba(14,165,233,0.08), rgba(59,130,246,0.05))',
                  border: '1px solid rgba(255,255,255,0.08)',
                  textAlign: 'center',
                }}
              >
                <div style={{ width: 84, height: 84, borderRadius: '50%', display: 'grid', placeItems: 'center', margin: '0 auto 18px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <ShoppingBag size={34} />
                </div>
                <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 10 }}>카트가 아직 비어 있어요</div>
                <p style={{ color: 'rgba(255,255,255,0.68)', marginBottom: 24, lineHeight: 1.7 }}>
                  마음에 드는 LED 제품을 담으면 이 화면이 바로 견적서처럼 바뀝니다.
                </p>
                <Link href="/shop" className="btn-primary">
                  제품 보러가기 <ArrowRight size={16} />
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
                        gridTemplateColumns: '120px 1fr auto',
                        gap: 18,
                        alignItems: 'center',
                        padding: 16,
                        borderRadius: 24,
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 12px 32px rgba(0,0,0,0.2)',
                        animation: 'fadeInUp 0.5s ease forwards',
                        animationDelay: `${index * 70}ms`,
                      }}
                    >
                      <div
                        style={{
                          width: '120px',
                          aspectRatio: '4 / 3',
                          borderRadius: 18,
                          overflow: 'hidden',
                          position: 'relative',
                          background: 'linear-gradient(135deg, rgba(14,165,233,0.16), rgba(59,130,246,0.1))',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        {image ? (
                          <img src={image} alt={item.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        ) : (
                          <div style={{ width: '100%', height: '100%', display: 'grid', placeItems: 'center', fontSize: 28 }}>💡</div>
                        )}
                      </div>

                      <div style={{ minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, flexWrap: 'wrap' }}>
                          <span className="tag" style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.8)' }}>{item.product.category}</span>
                          {item.product.badge && <span className="tag" style={{ background: 'rgba(16,185,129,0.12)', color: '#86efac' }}>{item.product.badge}</span>}
                        </div>
                        <Link
                          href={`/shop/${item.product.id}`}
                          style={{ color: '#fff', textDecoration: 'none', fontSize: 20, fontWeight: 900, letterSpacing: '-0.03em', display: 'inline-block', marginBottom: 8 }}
                        >
                          {item.product.name}
                        </Link>
                        <div style={{ color: 'rgba(255,255,255,0.62)', lineHeight: 1.7, fontSize: 14, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {item.product.description}
                        </div>
                      </div>

                      <div style={{ display: 'grid', justifyItems: 'end', gap: 12 }}>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          style={{
                            border: '1px solid rgba(255,255,255,0.08)',
                            background: 'rgba(255,255,255,0.03)',
                            color: 'rgba(255,255,255,0.75)',
                            borderRadius: 14,
                            padding: '10px 12px',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 8,
                            fontSize: 13,
                            fontWeight: 700,
                          }}
                        >
                          <Trash2 size={14} />
                          삭제
                        </button>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 6 }}>수량</div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'flex-end' }}>
                            <button
                              onClick={() => updateQty(item.product.id, Math.max(0, item.quantity - 1))}
                              style={{ width: 34, height: 34, borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: '#fff', cursor: 'pointer' }}
                            >
                              <Minus size={16} />
                            </button>
                            <div style={{ minWidth: 40, textAlign: 'center', fontWeight: 900, fontSize: 18 }}>{item.quantity}</div>
                            <button
                              onClick={() => updateQty(item.product.id, item.quantity + 1)}
                              style={{ width: 34, height: 34, borderRadius: 12, border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.04)', color: '#fff', cursor: 'pointer' }}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.45)', marginBottom: 4 }}>소계</div>
                          <div style={{ fontSize: 22, fontWeight: 900, color: '#7dd3fc' }}>{money(item.product.price * item.quantity)}원</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 16,
            }}
          >
            {[
              {
                title: '계좌이체만',
                desc: '카드 없이 깔끔한 입금 확인 프로세스',
                icon: <Banknote size={18} />,
              },
              {
                title: '복사 가능',
                desc: '입금 메모와 계좌 정보를 한 번에 복사',
                icon: <Copy size={18} />,
              },
              {
                title: '입금 후 안내',
                desc: `${companyPhone} · ${companyEmail}`,
                icon: <FileText size={18} />,
              },
            ].map((item) => (
              <div
                key={item.title}
                style={{
                  padding: 20,
                  borderRadius: 22,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div style={{ width: 42, height: 42, borderRadius: 14, display: 'grid', placeItems: 'center', background: 'rgba(255,255,255,0.06)', marginBottom: 14 }}>
                  {item.icon}
                </div>
                <div style={{ fontSize: 17, fontWeight: 900, marginBottom: 8 }}>{item.title}</div>
                <div style={{ color: 'rgba(255,255,255,0.68)', lineHeight: 1.7, fontSize: 14 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
