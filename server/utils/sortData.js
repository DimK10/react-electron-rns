const sortData = (output) => {
    // Arrays that will be stored in Object
    let e_c = [];
    let M = [];
    let M_0 = [];
    let R_e = [];
    let Omega = [];
    let Omega_p = [];
    let TW = [];
    let cJGM_sun2 = [];
    let I = [];
    let h_plus = [];
    let h_minus = [];
    let Z_p = [];
    let Z_f = [];
    let Z_b = [];
    let omega_cOmega = [];
    let r_e = [];
    let r_pR_e = [];

    
    // Object to return after this function is done
    let valuesReadyForGraph = {
        e_c,
        M,
        M_0,
        R_e,
        Omega,
        Omega_p,
        TW,
        cJGM_sun2,
        I,
        h_plus,
        h_minus,
        Z_p,
        Z_f,
        Z_b,
        omega_cOmega,
        r_e,
        r_pR_e
    };

    let divider = output.length / 17;
    let modulo = output.length % 17;

    for (let i = 0; i < divider; i++) {
       for (let j = 0; j < 17; j++) {
            switch (j) {
                case 0:
                    e_c.push(output[j + (i * 17)]);
                    break;
                case 1:
                    M.push(output[j + (i * 17)]);
                    break;
                case 2:
                    M_0.push(output[j + (i * 17)]);
                    break;
                case 3:
                    R_e.push(output[j + (i * 17)]);
                    break;
                case 4:
                    Omega.push(output[j + (i * 17)]);
                    break;
                case 5:
                    Omega_p.push(output[j + (i * 17)]);
                    break;
                case 6:
                    TW.push(output[j + (i * 17)]);
                    break;
                case 7:
                    cJGM_sun2.push(output[j + (i * 17)]);
                    break;
                case 8:
                    I.push(output[j + (i * 17)]);
                    break;
                case 9:
                    h_plus.push(output[j + (i * 17)]);
                    break;
                case 10:
                    h_minus.push(output[j + (i * 17)]);
                    break;
                case 11:
                    Z_p.push(output[j + (i * 17)]);
                    break;
                case 12:
                    Z_f.push(output[j + (i * 17)]);
                    break;
                case 13:
                    Z_b.push(output[j + (i * 17)]);
                    break;
                case 14:
                    omega_cOmega.push(output[j + (i * 17)]);
                    break;
                case 15:
                    r_e.push(output[j + (i * 17)]);;
                    break;
                case 16:
                    r_pR_e.push(output[j + (i * 17)]);
                    break;    
            
                default:
                    break;
            };
   
       } 
        
    };

    // This should be a case 
    if( modulo !== 0) {
        for (let k = 0; k < modulo; k++) {
            switch (k) {
                case 0:
                    e_c.push(output[k + (divider * 17)]);
                    break;
                case 1:
                    M.push(output[k + (divider * 17)]);
                    break;
                case 2:
                    M_0.push(output[k + (divider * 17)]);
                    break;
                case 3:
                    R_e.push(output[k + (divider * 17)]);
                    break;
                case 4:
                    Omega.push(output[k + (divider * 17)]);
                    break;
                case 5:
                    Omega_p.push(output[k + (divider * 17)]);
                    break;
                case 6:
                    TW.push(output[k + (divider * 17)]);
                    break;
                case 7:
                    cJGM_sun2.push(output[k + (divider * 17)]);
                    break;
                case 8:
                    I.push(output[k + (divider * 17)]);
                    break;
                case 9:
                    h_plus.push(output[k + (divider * 17)]);
                    break;
                case 10:
                    h_minus.push(output[k + (divider * 17)]);
                    break;
                case 11:
                    Z_p.push(output[k + (divider * 17)]);
                    break;
                case 12:
                    Z_f.push(output[k + (divider * 17)]);
                    break;
                case 13:
                    Z_b.push(output[k + (divider * 17)]);
                    break;
                case 14:
                    omega_cOmega.push(output[k + (divider * 17)]);
                    break;
                case 15:
                    r_e.push(output[k + (divider * 17)]);;
                    break;
                default:
                    break;
        };
    };     
};
    


    // for (let i = 0; i < outputs.length; i++) {
    //     for (let j = 0; j <= 17; j++) {
    //         if( i % j === 0) {
    //             switch (j) {
    //                 case 1:
    //                     e_c.push(outputs[i]);
    //                     break;
    //                 case 2:
    //                     M.push(outputs[i]);
    //                     break;
    //                 case 3:
    //                     M_0.push(outputs[i]);
    //                     break;
    //                 case 4:
    //                     R_e.push(outputs[i]);
    //                     break;
    //                 case 5:
    //                     Omega.push(outputs[i]);
    //                     break;
    //                 case 6:
    //                     Omega_p.push(outputs[i]);
    //                     break;
    //                 case 7:
    //                     TW.push(outputs[i]);
    //                     break;
    //                 case 8:
    //                     cJGM_sun2.push(outputs[i]);
    //                     break;
    //                 case 9:
    //                     I.push(outputs[i]);
    //                     break;
    //                 case 10:
    //                     h_plus.push(outputs[i]);
    //                     break;
    //                 case 11:
    //                     h_minus.push(outputs[i]);
    //                     break;
    //                 case 12:
    //                     Z_p.push(outputs[i]);
    //                     break;
    //                 case 13:
    //                     Z_f.push(outputs[i]);
    //                     break;
    //                 case 14:
    //                     Z_b.push(outputs[i]);
    //                     break;
    //                 case 15:
    //                     omega_cOmega.push(outputs[i]);
    //                     break;
    //                 case 16:
    //                     r_e.push(outputs[i]);;
    //                     break;
    //                 case 17:
    //                     r_pR_e.push(outputs[i]);
    //                     break;    
                
    //                 default:
    //                     break;
    //             };
    //         };  
    //     };  
    // };
    return valuesReadyForGraph;
};

module.exports = sortData;