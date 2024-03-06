class r extends HTMLElement{static identifiers={};constructor(){super(),this.autoOffset=50,this._needsStylesheet=!0,this.attrs={breakpoint:"breakpoint",breakpointBackwardsCompat:"media",type:"type",ratio:"ratio",label:"data-tablesaw-label",zeropad:"zero-padding",forceTextAlign:"text-align"},this.defaults={breakpoint:"(max-width: 39.9375em)",ratio:"1fr 2fr"},this.classes={wrap:"tablesaw-wrap"},this.props={ratio:"--table-saw-ratio"}}generateCss(e,i){return`
table-saw.${this._identifier} {
	display: block;
	${i==="container"?"container-type: inline-size;":""}
}

@${i} ${e} {
	table-saw.${this._identifier} thead :is(th, td) {
		position: absolute;
		height: 1px;
		width: 1px;
		overflow: hidden;
		clip: rect(1px, 1px, 1px, 1px);
	}
	table-saw.${this._identifier} :is(tbody, tfoot) tr {
		display: block;
		margin-bottom: 1em;
	}
	table-saw.${this._identifier} :is(tbody, tfoot) :is(th, td):before {
		font-weight: bold;
		content: attr(${this.attrs.label});
	}
	table-saw.${this._identifier} :is(tbody, tfoot) :is(th, td) {
		display: grid;
		gap: 0 1em;
		grid-template-columns: var(--table-saw-ratio, ${this.defaults.ratio});
	}
	table-saw.${this._identifier}[${this.attrs.forceTextAlign}] :is(tbody, tfoot) :is(th, td) {
		text-align: ${this.getAttribute(this.attrs.forceTextAlign)||"left"};
	}
	table-saw.${this._identifier}[${this.attrs.zeropad}] :is(tbody, tfoot) :is(th, td) {
		padding-left: 0;
		padding-right: 0;
	}
}`}connectedCallback(){if(!("replaceSync"in CSSStyleSheet.prototype)||(this.addHeaders(),this.setRatio(),!this._needsStylesheet))return;let e=new CSSStyleSheet,i=this.getAttribute(this.attrs.breakpoint)||this.getAttribute(this.attrs.breakpointBackwardsCompat)||this.defaults.breakpoint,t=this.getAttribute(this.attrs.type)||"media";if(this._identifier=`ts_${t.slice(0,1)}${i.replace(/[^a-z0-9]/gi,"_")}`,this.classList.add(this._identifier),!r.identifiers[this._identifier]){let a=this.generateCss(i,t);e.replaceSync(a),document.adoptedStyleSheets=[...document.adoptedStyleSheets,e],r.identifiers[this._identifier]=!0}}addHeaders(){let e=Array.from(this.querySelectorAll("thead th")).map(t=>t.innerText.trim());if(e.length===0){this._needsStylesheet=!1,console.error("No `<th>` elements for Tablesaw were found:",this);return}let i=this.querySelectorAll("tbody :is(td, th)");for(let t of i){if(!e[t.cellIndex])continue;t.setAttribute(this.attrs.label,e[t.cellIndex]);let a=0;for(let s of t.childNodes)(s.nodeType===3||s.nodeType===1)&&a++;if(a>1){let s=document.createElement("div");for(s.classList.add(this.classes.wrap);t.firstChild;)s.appendChild(t.firstChild);t.appendChild(s)}}}setRatio(){let e=this.getAttribute(this.attrs.ratio);if(e){let i=e.split("/").join("fr ")+"fr";this.style.setProperty(this.props.ratio,i)}}}"customElements"in window&&window.customElements.define("table-saw",r);
