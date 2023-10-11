import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Hook personnalisé pour gérer les redirections basées sur une condition.
 *
 * @param {boolean} shouldRedirect La condition déterminant si une redirection doit avoir lieu.
 * @param {string} redirectTo Le chemin vers lequel rediriger l'utilisateur si la condition est remplie.
 */
function useConditionalRedirect(shouldRedirect, redirectTo) {
  const navigate = useNavigate();

  useEffect(() => {
    if (shouldRedirect) {
      navigate(redirectTo);
    }
  }, [shouldRedirect, redirectTo, navigate]);
}

export default useConditionalRedirect;
