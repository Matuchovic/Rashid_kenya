export function Footer() {
  return (
    <footer style={{ background:'#000', borderTop:'0.5px solid rgba(212,167,95,0.06)', padding:'clamp(28px,5vh,40px) clamp(20px,5vw,48px)' }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:20 }}>
        <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(20px,4vw,24px)', fontWeight:200, color:'rgba(212,167,95,0.5)' }}>Rashid</div>
        <div style={{ display:'flex', gap:'clamp(16px,4vw,32px)', flexWrap:'wrap' }}>
          {['WhatsApp','Instagram','Email'].map(l => (
            <span key={l} style={{ fontSize:8, letterSpacing:'0.18em', color:'rgba(242,230,208,0.25)', textTransform:'uppercase', cursor:'pointer' }}>{l}</span>
          ))}
        </div>
        <div style={{ fontSize:8, letterSpacing:'0.12em', color:'rgba(242,230,208,0.15)', width:'100%', textAlign:'center' }}>
          © 2026 Rashid Adventures Kenya
        </div>
      </div>
    </footer>
  )
}
