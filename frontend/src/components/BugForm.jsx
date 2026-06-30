import { useState, useEffect } from 'react';

export default function BugForm({ onBugCreated, onBugUpdated, bugToEdit, loading }) {

    const [nombreJuego, setNombreJuego] = useState('');
    const [plataforma, setPlataforma] = useState('');
    const [tipo, setTipo] = useState('');
    const [gravedad, setGravedad] = useState('Baja');
    const [descripcion, setDescripcion] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const [errors, setErrors] = useState([]);

    useEffect(() => {
        if (bugToEdit) {
            setNombreJuego(bugToEdit.nombreJuego);
            setPlataforma(bugToEdit.plataforma);
            setTipo(bugToEdit.tipo);
            setGravedad(bugToEdit.gravedad);
            setDescripcion(bugToEdit.descripcion);
            setImageUrl(bugToEdit.imageUrl || '');
            setErrors([]);
        } else {
            limpiarFormulario();
        }
    }, [bugToEdit]);

    const limpiarFormulario = () => {
        setNombreJuego('');
        setPlataforma('');
        setTipo('');
        setGravedad('Baja');
        setDescripcion('');
        setImageUrl('');
        setErrors([]);
    };

    const validarFormulario = () => {
        const newErrors = [];

        if (!nombreJuego.trim()) {
            newErrors.push("El nombre del juego es obligatorio.");
        }

        if (!plataforma) {
            newErrors.push("Debe seleccionar una plataforma.");
        }

        if (!tipo) {
            newErrors.push("Debe seleccionar un tipo de bug.");
        }

        if (!descripcion.trim()) {
            newErrors.push("La descripción es obligatoria.");
        } else if (descripcion.trim().length < 5) {
            newErrors.push("La descripción debe tener mínimo 5 caracteres.");
        }

        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validarFormulario()) return;

        const bugData = {
            nombreJuego,
            plataforma,
            tipo,
            gravedad,
            descripcion,
            imageUrl: imageUrl.trim() || null
        };

        if (bugToEdit) {
            onBugUpdated({ ...bugData, id: bugToEdit.id });
        } else {
            onBugCreated(bugData);
        }

        limpiarFormulario();
    };

    return (
        <form className="bug-form" id="bugForm" onSubmit={handleSubmit}>

            {errors.length > 0 && (
                <div className="error-box">
                    {errors.map((err, index) => (
                        <p key={index} className="error-text">{err}</p>
                    ))}
                </div>
            )}

            {/* -----------Juego----------- */}
            <label className="form-label">¿En qué juego apareció?</label>
            <input
                type="text"
                placeholder="Escribí el nombre del juego"
                value={nombreJuego}
                onChange={(e) => setNombreJuego(e.target.value)}
            />

            {/* -----------Plataforma----------- */}
            <label className="form-label">Plataforma</label>
            <select value={plataforma} onChange={(e) => setPlataforma(e.target.value)}>
                <option value="">Seleccioná una plataforma</option>
                <option value="PC">PC</option>
                <option value="PlayStation 5">PlayStation 5</option>
                <option value="PlayStation 4">PlayStation 4</option>
                <option value="Xbox Series X">Xbox Series X</option>
                <option value="Xbox Series S">Xbox Series S</option>
                <option value="Nintendo Switch">Nintendo Switch</option>
                <option value="Nintendo Switch 2">Nintendo Switch 2</option>
                <option value="Android">Android</option>
                <option value="iOS">iOS</option>
            </select>

            {/* -----------Tipo de Bug----------- */}
            <label className="form-label">Tipo de Bug</label>
            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="">Seleccioná un tipo de bug</option>
                <option value="Gráfico">Gráfico</option>
                <option value="Audio">Audio</option>
                <option value="Gameplay">Gameplay</option>
            </select>

            {/* -----------Gravedad----------- */}
            <label className="form-label">Gravedad</label>
            <select value={gravedad} onChange={(e) => setGravedad(e.target.value)}>
                <option value="Baja">Baja</option>
                <option value="Media">Media</option>
                <option value="Alta">Alta</option>
            </select>

            {/* -----------Descripción----------- */}
            <label className="form-label">Contanos qué pasó</label>
            <textarea
                placeholder="Describí el bug con el mayor detalle posible"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
            />

            {/* -----------URL de imagen----------- */}
            <label className="form-label">URL de portada (opcional)</label>
            <input
                type="text"
                placeholder="https://ejemplo.com/imagen.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
            />
        </form>
    );
}