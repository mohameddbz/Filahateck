import React, { useState, useEffect, useContext } from "react";
import { makeRequest } from "./../../utils/api/httpService";
import { useNavigate } from "react-router-dom";
import { LanguageContext } from "../../context/LanguageContext";
import Offre from "../../components/pages/home/offer/offer";
import ButtonConfirm from "../../components/pages/auth/common/ButtonConfirm";

const translations = {
  french: {
    noOfferFound: "Aucun abonnement trouvé pour cet utilisateur.",
    title: "Vous pouvez consulter nos offres ci-dessous",
    subtitle: "Choisissez ce qui vous convient",
    submitButton: "Soumettre",
    noOfferSelected: "Veuillez sélectionner une offre avant de continuer",
  },
  arabic: {
    noOfferFound: "لم يتم العثور على اشتراكات لهذا المستخدم.",
    title: "يمكنك الاطلاع على عروضنا أدناه",
    subtitle: "اختر ما يناسبك",
    submitButton: "إرسال",
    noOfferSelected: "الرجاء اختيار عرض قبل المتابعة",
  },
};

const AbonnementComparison = () => {
  // Offer selection states (for fallback view)
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [offersData, setOffersData] = useState([]);
  const [validationError, setValidationError] = useState("");
  
  // Abonnement comparison states
  const [userId, setUserId] = useState(null);
  const [abonnementUsers, setAbonnementUsers] = useState([]);
  const [abonnements, setAbonnements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState([]);
  const [error, setError] = useState(null);

  const { isArabic } = useContext(LanguageContext);
  const language = isArabic ? "arabic" : "french";
  const texts = translations[language];
  const navigate = useNavigate();

  // Function to fetch userId using your provided code.
  const fetchUserId = async () => {
    try {
      const token = localStorage.getItem("Token");
      if (!token) throw new Error("Token non trouvé, veuillez vous connecter.");
      const response = await makeRequest(
        "/users/get",
        "GET",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const id = response.data?.data?.user_id || null;
      setUserId(id);
      console.log("User ID:", id);
      return id; // Return the userId for chaining
    } catch (error) {
      setError(error.message);
      console.error("Error fetching user ID:", error);
      return null;
    }
  };

  // Fetch abonnementUser records for the current user
  const fetchAbonnementUsers = async (currentUserId) => {
    try {
      const response = await makeRequest(
        `http://localhost:5000/api/abonnementUser/user/${currentUserId}/status`,
        "GET"
      );
      setAbonnementUsers(response.data);
      console.log("AbonnementUser data:", response.data);
    } catch (error) {
      console.error("Error fetching abonnementUser data:", error);
    }
  };

  // Fetch all abonnements details
  const fetchAbonnements = async () => {
    try {
      const response = await makeRequest("/abonnement/details", "GET");
      const formattedData = response.data.map((abonnement) => ({
        id: abonnement.id,
        nameAbonnement: abonnement.nameAbonnement || "",
        nameClient: abonnement.nameClient || "",
        prices: abonnement.prices || "",
        createdAt: abonnement.createdAt
          ? new Date(abonnement.createdAt).toLocaleDateString()
          : "",
        updatedAt: abonnement.updatedAt
          ? new Date(abonnement.updatedAt).toLocaleDateString()
          : "",
        fonctionnalities:
          abonnement.fonctionnalities?.map((f) => ({
            id: f.id,
            name: f.name,
            psudo: f.psudo,
          })) || [],
        indices:
          abonnement.indices?.map((i) => ({
            id: i.id,
            name: i.name,
            recommendation: i.recommendation,
            description: i.description,
          })) || [],
      }));
      setAbonnements(formattedData);
    } catch (error) {
      console.error("Error fetching abonnements:", error);
    }
  };

  // Fetch offers for fallback view
  const fetchOffers = async () => {
    try {
      const response = await makeRequest("/abonnementFonctionnality/detailed", "GET");
      setOffersData(response.data);
      console.log("---",response)
    } catch (error) {
      setError(error.message);
    } finally {
      // Only affect fallback offers loading if needed; here we assume same loading state.
      setLoading(false);
    }
  };

  // Initialize data with sequential fetching
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const currentUserId = await fetchUserId();
      await fetchOffers();
      if (currentUserId) {
        await Promise.all([fetchAbonnementUsers(currentUserId), fetchAbonnements()]);
      } else {
        // If no userId found, you might want to fetch offers for fallback.
        await fetchOffers();
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  // Reset validation error if an offer is selected
  useEffect(() => {
    if (selectedOffer) {
      setValidationError("");
    }
  }, [selectedOffer]);

  // Toggle selection for fallback offers
  const handleCheckboxChange = (index) => {
    setSelectedOffer(selectedOffer === offersData[index] ? null : offersData[index]);
  };

  // Handle submit for fallback offers
  const handleSubmit = async () => {
    if (!selectedOffer) {
      setValidationError(texts.noOfferSelected);
      return;
    }

    if (!userId) {
      console.error("ID utilisateur non trouvé.");
      return;
    }

    try {
      const payload = {
        abn_id: selectedOffer.id,
        user_id: userId,
        date_abonnement: new Date().toISOString().split("T")[0],
        durée: 12,
        etat: "désactivé",
      };

      const result = await makeRequest("/abonnementUser", "POST", payload);
      console.log("Offer submitted successfully:", result);
      navigate("/user/marketplace");
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'offre:", error);
      setError(error.message);
    }
  };

  // Merge abonnementUser with abonnement details using abn_id.
  const mergedData = abonnementUsers.map((abu) => {
    const matchingAbonnement = abonnements.find((ab) => ab.id === abu.abn_id);
    return {
      ...abu,
      AbonnementDetails: matchingAbonnement || {},
    };
  });

  // If no abonnementUser records found, display fallback offer view
  if (mergedData.length === 0) {
    return (
      <div className="min-h-screen flex flex-col gap-10">
        <div
          className="ml-32 mr-32 mt-14 mb-6"
          style={isArabic ? { direction: "rtl" } : { direction: "ltr" }}
        >
          <p className="text-2xl font-bold">{texts.title}</p>
          <p className="text-lg">{texts.subtitle}</p>
        </div>

        <div className="flex flex-col gap-10 justify-center items-center">
          {offersData.map((offer, index) => (
            <Offre
              key={offer.id || index}
              text={offer.name}
              titre={offer.description}
              functionalities={offer.fonctionnalities}
              price={offer.prices && offer.prices[0]}
              isChecked={selectedOffer === offer}
              onCheckboxChange={() => handleCheckboxChange(index)}
            />
          ))}
        </div>

        <div className="flex flex-col items-end mr-[30%] mb-[10%] gap-2">
          {validationError && (
            <div className="text-red-500 text-sm">{validationError}</div>
          )}
          <div className="w-28 h-8">
            <ButtonConfirm text={texts.submitButton} onClick={handleSubmit} />
          </div>
        </div>
      </div>
    );
  }

  const toggleDetails = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <div className="max-w-6xl mx-auto my-16 px-4">
      <h1 className="text-5xl font-bold text-center text-gray-800 mb-12">
        Mes Abonnements
      </h1>
      {mergedData.map((item) => (
        <div
          key={item.id}
          className="mb-12 border-t border-gray-200 pt-8 transition-all duration-300"
        >
          {/* Abonnement Main Header */}
          <div className="bg-gray-300 rounded-xl shadow-lg p-6">
            <div className="text-center">
              <h2 className="text-4xl font-extrabold text-gray-900">
                {item.AbonnementDetails.nameAbonnement}
              </h2>
              <p className="mt-2 text-xl text-gray-600">
                {item.AbonnementDetails.nameClient}
              </p>
              <p className="mt-4 text-2xl font-bold text-indigo-600">
                Prix: {item.AbonnementDetails.prices}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Créé le: {item.AbonnementDetails.createdAt}
              </p>
            </div>
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => toggleDetails(item.id)}
                className="px-8 py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-full transition-colors duration-200"
              >
                {expandedIds.includes(item.id)
                  ? "Masquer les détails"
                  : "Afficher les détails"}
              </button>
            </div>
          </div>

          {expandedIds.includes(item.id) && (
            <div className="mt-6 space-y-10">
              {/* AbonnementUser Specific Details */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-4">
                  Détails de l'abonnement utilisateur
                </h3>
                <div className="space-y-2 text-lg text-gray-700">
                  <p>
                    <strong>Date d'abonnement:</strong>{" "}
                    {new Date(item.date_abonnement).toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Durée:</strong> {item.durée} mois
                  </p>
                  <p>
                    <strong>État:</strong>{" "}
                    <span
                      className={
                        item.etat === "actif"
                          ? "text-green-600"
                          : "text-red-600"
                      }
                    >
                      {item.etat}
                    </span>
                  </p>
                </div>
              </div>

              {/* Fonctionnalités */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-4">
                  Fonctionnalités
                </h3>
                {item.AbonnementDetails.fonctionnalities &&
                item.AbonnementDetails.fonctionnalities.length > 0 ? (
                  <ul className="space-y-3">
                    {item.AbonnementDetails.fonctionnalities.map((func) => (
                      <li
                        key={func.id}
                        className="flex items-center space-x-3 text-lg text-gray-700"
                      >
                        <span className="inline-block w-3 h-3 bg-indigo-500 rounded-full"></span>
                        <span>
                          {func.name}{" "}
                          <span className="text-sm text-gray-500">
                            ({func.psudo})
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">
                    Aucune fonctionnalité disponible.
                  </p>
                )}
              </div>

              {/* Indices */}
              <div className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-3xl font-bold text-gray-800 border-b pb-2 mb-4">
                  Indices
                </h3>
                {item.AbonnementDetails.indices &&
                item.AbonnementDetails.indices.length > 0 ? (
                  item.AbonnementDetails.indices.map((index) => (
                    <div
                      key={index.id}
                      className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <h4 className="text-2xl font-semibold text-gray-900">
                        {index.name}
                      </h4>
                      <p className="mt-2 text-gray-700">{index.description}</p>
                      <p className="mt-2 italic text-gray-600">
                        <strong>Recommandation:</strong>{" "}
                        {index.recommendation}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">Aucun indice disponible.</p>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AbonnementComparison;
