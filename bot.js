const Discord = require("discord.js"); //
const client = new Discord.Client(); //
const ayarlar = require("./ayarlar.json"); //
const chalk = require("chalk"); //
const moment = require("moment"); //
var Jimp = require("jimp"); //
const { Client, Util } = require("discord.js"); //
const fs = require("fs"); //
const db = require("quick.db"); //
const express = require("express"); //
require("./util/eventLoader.js")(client); //
const path = require("path"); //
const snekfetch = require("snekfetch"); //
//

var prefix = ayarlar.prefix; //
//
const log = message => {
  //
  console.log(`${message}`); //
};

client.commands = new Discord.Collection(); //
client.aliases = new Discord.Collection(); //
fs.readdir("./komutlar/", (err, files) => {
  //
  if (err) console.error(err); //
  log(`${files.length} komut yüklenecek.`); //
  files.forEach(f => {
    //
    let props = require(`./komutlar/${f}`); //
    log(`Yüklenen komut: ${props.help.name}.`); //
    client.commands.set(props.help.name, props); //
    props.conf.aliases.forEach(alias => {
      //
      client.aliases.set(alias, props.help.name); //
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }

  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });
client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});
client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});

client.login(ayarlar.token);

//-----------------------GİRENE-ROL-VERME----------------------\\     STG

client.on("guildMemberAdd", member => {
  member.roles.add("791914476315082752"); // UNREGİSTER ROLÜNÜN İDSİNİ GİRİN
});
  `member.setNickname(" ୪ İsim | Yaş`;

//-----------------------GİRENE-ROL-VERME----------------------\\     STG

//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     STG

client.on("guildMemberAdd", member => {
  const kanal = member.guild.channels.cache.find(
    r => r.id === "791914551649763368"
  );
  const register = "<@&791914423026450442>";
  let user = client.users.cache.get(member.id);
  require("moment-duration-format");
  const kurulus = new Date().getTime() - user.createdAt.getTime();

  var kontrol;
  if (kurulus < 1296000000) kontrol = "Hesap Durumu: Güvenilir Değil";
  if (kurulus > 1296000000) kontrol = "Hesap Durumu: Güvenilir Gözüküyor";
  moment.locale("tr");
  const strigalog = new Discord.MessageEmbed()
    .setAuthor(member.guild.name)
    .setDescription(
      "** <a:tac:790913931367546880> Hoşgeldin! <@" +
        member +
        "> Seninle `" +
        member.guild.memberCount +
        "` Kişiyiz.\n\n <a:redstar:790913918679646219> Müsait olduğunda Confirmed Odalarından Birine Geçip Kaydını Yaptırabilirsin. \n\n <a:xbrave:790913867504418817> <@&790884227847553074> seninle ilgilenicektir. \n\nHesabın Oluşturulma Tarihi: " +
        moment(member.user.createdAt).format("`YYYY DD MMMM dddd`") +
        "\n\n" +
        kontrol +
        " <a:mavimsitik:790913911649206303> \n\n <a:registerbook:790913867642699776> Tagımızı alarak ` ୪ ` bize destek olabilirsin.**\n"
    )
    .setImage(
      "https://pa1.narvii.com/7646/ea19d7d27009b81edcdd88ffa49bd2abb48dd675r1-300-300_00.gif"
    );
  kanal.send(strigalog);
  kanal.send(register);
});

//-----------------------HOŞ-GELDİN-MESAJI----------------------\\     STG

//-----------------------OTO-TAG-----------------------\\     STG

client.on("userUpdate", async (oldUser, newUser) => {
  if (oldUser.username !== newUser.username) {
    const tag = "୪";
    const sunucu = "788386204369551372";
    const kanal = "791914677679423499";
    const rol = "791914448699785246";

    try {
      if (
        newUser.username.includes(tag) &&
        !client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(rol)
      ) {
        await client.channels.cache
          .get(kanal)
          .send(
            new Discord.MessageEmbed()
              .setColor("GREEN")
              .setDescription(
                `${newUser} ${tag} Tagımızı Aldığı İçin <@&${rol}> Rolünü Verdim`
              )
          );
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.add(rol);
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .send(
            `Selam ${
              newUser.username
            }, Sunucumuzda ${tag} Tagımızı Aldığın İçin ${
              client.guilds.cache.get(sunucu).roles.cache.get(rol).name
            } Rolünü Sana Verdim!`
          );
      }
      if (
        !newUser.username.includes(tag) &&
        client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.cache.has(rol)
      ) {
        await client.channels.cache
          .get(kanal)
          .send(
            new Discord.MessageEmbed()
              .setColor("RED")
              .setDescription(
                `${newUser} ${tag} Tagımızı Çıkardığı İçin <@&${rol}> Rolünü Aldım`
              )
          );
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .roles.remove(rol);
        await client.guilds.cache
          .get(sunucu)
          .members.cache.get(newUser.id)
          .send(
            `Selam **${
              newUser.username
            }**, Sunucumuzda ${tag} Tagımızı Çıkardığın İçin ${
              client.guilds.cache.get(sunucu).roles.cache.get(rol).name
            } Rolünü Senden Aldım!`
          );
      }
    } catch (e) {
      console.log(`Bir hata oluştu! ${e}`);
    }
  }
});

//Serendia'dan alınıp V12 Çevirilmiştir!

//-----------------------OTO-TAG-----------------------\\     STG

client.on("userUpdate", async (stg, yeni) => {
  var sunucu = client.guilds.cache.get("788386204369551372"); // Buraya Sunucu ID
  var uye = sunucu.members.cache.get(yeni.id);
  var tag = "୪"; // Buraya Ekip Tag
  var tagrol = "791914448699785246"; // Buraya Ekip Rolünün ID
  var kanal = "791914677679423499"; // Loglanacağı Kanalın ID

  if (
    !sunucu.members.has(yeni.id) ||
    yeni.bot ||
    stg.username === yeni.username
  )
    return;

  if (yeni.username.includes(tag) && !uye.roles.has(tagrol)) {
    try {
      await uye.roles.add(tagrol);
      await uye.send(`Tagımızı aldığın için teşekkürler! Aramıza hoş geldin.`);
      await client.channels.cache
        .get(kanal)
        .send(`${yeni} adlı üye tagımızı alarak aramıza katıldı!`);
    } catch (err) {
      console.error(err);
    }
  }

  if (!yeni.username.includes(tag) && uye.roles.has(tagrol)) {
    try {
      await uye.roles.remove(
        uye.roles.filter(
          rol => rol.position >= sunucu.roles.get(tagrol).position
        )
      );
      await uye.send(
        `Tagımızı bıraktığın için ekip rolü ve yetkili rollerin alındı! Tagımızı tekrar alıp aramıza katılmak istersen;\nTagımız: **${tag}**`
      );
      await client.channels.cache
        .get(kanal)
        .send(`${yeni} adlı üye tagımızı bırakarak aramızdan ayrıldı!`);
    } catch (err) {
      console.error(err);
    }
  }
});
client.on("message", message => {
  if (message.content === "tag") {
    message.channel.send("୪");
  }
});


client.on("message", message => {
  if (message.content === ".tag") {
    message.channel.send("୪");
  }
});





client.on("message", message => {
  if (message.content === "TAG") {
    message.channel.send("୪");
  }
});

client.on("message", message => {
  if (message.content === "sa") {
    message.channel.send("Aleyküm Selam **Hoşgeldin**");
  }
});

client.on("message", message => {
  if (message.content === "Sa") {
    message.channel.send("Aleyküm Selam **Hoşgeldin**");
  }
});

client.on("message", message => {
  if (message.content === "sA") {
    message.channel.send("Aleyküm Selam **Hoşgeldin**");
  }
});

client.on("message", message => {
  if (message.content === "selamın aleyküm") {
    message.channel.send("Aleyküm Selam **Hoşgeldin**");
  }
});

client.on("message", message => {
  if (message.content === "Selamın Aleyküm") {
    message.channel.send("Aleyküm Selam **Hoşgeldin**");
  }
});

client.on("message", message => {
  if (message.content === "SA") {
    message.channel.send("Aleyküm Selam **Hoşgeldin**");
  }
});

client.on("message", message => {
  if (message.content === "SA") {
    message.channel.send("Aleyküm Selam **Hoşgeldin**");
  }
});

client.on("message", message => {
  if (message.content === "selam") {
    message.channel.send("Aleyküm Selam **Hoşgeldin**");
  }
});

`member.setNickname("³³³ İsim | Yaş`;

client.login(ayarlar.token);
