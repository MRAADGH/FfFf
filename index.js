
const crypto = require('crypto');
const iv = Buffer.from('d4c453afdb4d0fa6e70aedcf9e494547', 'hex');
const algorithm = 'aes-256-cbc';

// تحميل المفاتيح من ملف البيئة
const keysDecryptionKey = process.env.KEYS_DECRYPTION_KEY;
const encryptedKeys = [
    process.env.ENCRYPTED_KEY_1,
    process.env.ENCRYPTED_KEY_2,
    process.env.ENCRYPTED_KEY_3
];

// فك تشفير المفاتيح السرية
const secretKeys = encryptedKeys.map(encryptedKey => {
    const decipher = crypto.createDecipheriv(algorithm, Buffer.from(keysDecryptionKey, 'hex'), iv);
    return Buffer.concat([
        decipher.update(Buffer.from(encryptedKey, 'hex')),
        decipher.final()
    ]).toString('utf8');
});

function decryptText(encryptedText, secretKeys) {
    try {
        let decryptedText = encryptedText;
        for (let i = secretKeys.length - 1; i >= 0; i--) {
            const decipher = crypto.createDecipheriv(algorithm, Buffer.from(secretKeys[i], 'hex'), iv);
            decryptedText = Buffer.concat([
                decipher.update(Buffer.from(decryptedText, 'hex')),
                decipher.final()
            ]).toString('utf8');
        }
        return decryptedText;
    } catch (error) {
        throw new Error('Error decrypting the text: ' + error.message);
    }
}
// المتغير المشفر الجديد
const encryptedCode = "f69c791c6e6a1377180a28200d5d27ddd1bac0198ea6e7e187e147ca9aadd16f4b44815ced50c19fcf2e7cd9ae39f724d1b79317712e7d6699c18cad81613f4e21de05a1a7bc1b10be01977185b640ab57d408af3a8dff2dac4ddd10a6f9cf53b343298d23cc1a313415e29181f8cc9366cbb48fd70986b168ce703343669c2c7a3bce928d137790978cdd6d87bd19b4823c3b4c5480130a9c70200179b7f6051243aa86e7bebb1a8c2b92db7cc571050bed2f0bf06638eec9ec6cbd36d2a0a3dbc77c2e91ff72e63a296a9fa40bbb02f2de2e0f0a1365e28daac804387f80c16e8f5ee7a193258a1659fa229cd14a03113ba16b0af92101ea94d1acc3546714f83650b4b5402f4401f4f8167cdf77fcee0d56d33dc51967a11301e056da2600705cba82b1e7e7bb3349146a7be887ad1943e32966617dac6c0e6524225e408886390050cee6513483f3c538695abd485b5aa07a95aeee8cd84d1316bfb2b24547e5ae31140460efa5ce06d90924e7aeb2f626d50add7ad490127186f783b0b7bb0ecbc0083c86e8584e046673e864a6cc61a3d80023cea0c6bd19bf67565550d5515ae2b99e85a57836321615b949277652db918b54c6be9d3f4fedc1cd9249d9c294ca7d4eef731d0f32494cce45f92cde0536fad2fe2f7e360d6a09052613e905fa626d3c06834fe74bdba3dc7550fbcf1095052d6d83ff1dad20576e2a1de903ea335d4052861061b684c8b62613b1940c172f14f32df4084270b4243412af67300f07165f3a5b809b0b7ab63da7b3dbb429afabea515ade753545f9dda4c870893ac047ca37026d1f86e856870533f53fe28d29bca6c3ccf9d42ef683a77156191ef43058209890f6ee8309e34c73a003519bb409d233fb1068841cb9c218a770ca7fea7c0983f4f1b8f7fff1461d80c1d4bbe39adbc47801871e4e7ead0f91e51ef53292881cf2ecdff149068f7a72c7aa686313e4f7f22ee3b17dc0cc99fa866300bce150297451000e9eae9ea073b69f64e9d8daec409fc68033c3040a53b584f7a0471c23a123b3e425337a19889d97109d3a987144f87ab2fe135718f0aa28dad5f0e083e5df95efa365e58aeffbf2cd091468d05c37419ce080445f3a15dd07abeb8bc4d62e0b987e1a63f62516def54198bb4590fc20517251e237e4b1fb4c8dc794bb7fd8f49a24ff0ebec14594f64164fe8ecab1dca3f8c5d5a4045b526a422d167f473d656b874f5d3586784ebeb1fa8b379871b15484d5f7b6d822c067b2b21f7e68c090cb90c14cefdb8b5bd26981c728e73987e9ebabf431ef88f68932aca9d72a1a0ff9f779542e423723a6f8435b701ed3a61b02aaa368718abf568ce5de46390d70ac3c49c169a2bc7c2added624b06d730e13259047cd9562e3077c1b0640d7c65173a44d264fcc41
eval(decryptText(encryptedCode, secretKeys));
