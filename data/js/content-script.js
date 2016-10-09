/**
 * Material-Netgear-Genie
 * Main script
 */
(function() {
    // Check if self is in iframe
    if (window.self != window.top)
        document.body.setAttribute('data-iframe', true);

    // Append pathname to body for styling purpose
    document.body.setAttribute('data-pathname', window.location.pathname);
})();
