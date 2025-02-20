const EmptyProducts = ({ className }) => {
  return (
    <div className={`tt-empty-search w-100 ${className}`}>
      <span className="tt-icon icon-g-84" />
      <h2 className="tt-title">LISTA E PRODUKTEVE ËSHTË BOSH</h2>
      <p>Nuk ka asnjë produkt në sistem</p>
    </div>
  );
};

export default EmptyProducts;
