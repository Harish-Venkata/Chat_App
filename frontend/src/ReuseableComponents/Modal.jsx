/* eslint-disable react/prop-types */
export default function Modal({ children, id }) {
  return (
    <dialog id={id} className="modal w-screen">
      <div className="modal-box w-full">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-sm btn-circle btn-ghost ">✕</button>
        </form>
        {children}
      </div>
    </dialog>
  );
}
