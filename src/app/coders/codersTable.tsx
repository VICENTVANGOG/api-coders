"use client";

import { useState } from "react";
import { Icoder } from "@/models/coders.models";
import { CoderService } from "@/services/coders.services";
import { useRouter } from "next/navigation";
import './CodersTable.css';

interface IProps {
  data: Icoder[];
}

function CodersTable({ data }: IProps) {
  const useCoderService = new CoderService();
  const router = useRouter();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCoder, setNewCoder] = useState<Icoder>({ id: '', name: '', avatar: '', createAt: '' });
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = async (id: string) => {
    await useCoderService.destroy(id);
    router.refresh();
  };

  const handleCreateOrUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isEditing) {
      await useCoderService.update(newCoder);
    } else {
      await useCoderService.post(newCoder); 
    }
    closeModal();
  };

  const openModalForEdit = (coder: Icoder) => {
    setNewCoder(coder); 
    setIsEditing(true); 
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    resetNewCoder();
    setIsEditing(false);
    router.refresh();
  };

  const resetNewCoder = () => {
    setNewCoder({ id: '', name: '', avatar: '', createAt: '' });
  };

  return (
    <>
      <button className="action-button" onClick={() => { resetNewCoder(); setIsEditing(false); setIsModalOpen(true); }}>
        Crear
      </button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <h2>{isEditing ? "Editar Codificador" : "Agregar Nuevo Codificador"}</h2>
            <form onSubmit={handleCreateOrUpdate}>
              <label>
                Nombre:
                <input
                  className="bg-slate-500"
                  type="text"
                  value={newCoder.name}
                  onChange={(e) => setNewCoder({ ...newCoder, name: e.target.value })}
                  required
                />
              </label>
              <label>
                Avatar:
                <input
                  className="bg-slate-500"
                  type="text"
                  value={newCoder.avatar}
                  onChange={(e) => setNewCoder({ ...newCoder, avatar: e.target.value })}
                  required
                />
              </label>
              <button type="submit" className="action-button">{isEditing ? "Actualizar" : "Crear"}</button>
            </form>
          </div>
        </div>
      )}

      <table className="coders-table">
        <thead>
          <tr>
            <th className="table-header">Id</th>
            <th className="table-header">Nombre</th>
            <th className="table-header">Avatar</th>
            <th className="table-header">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((coder) => (
            <tr key={coder.id}>
              <td className="table-cell">{coder.id}</td>
              <td className="table-cell">{coder.name}</td>
              <td className="table-cell">
                <img
                  src={coder.avatar}
                  alt={coder.name}
                  className="coder-avatar"
                />
              </td>
              <td className="table-cell">
                <button className="action-button" onClick={() => openModalForEdit(coder)}>Editar</button>
                <button
                  className="action-button"
                  onClick={() => handleDelete(coder.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default CodersTable;
