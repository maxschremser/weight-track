rm weight-track.apk
echo "build ionic release:"
ionic build --prod
ionic cordova compile android --release

echo "signjar:"
bin/signjar.sh

echo "zipalign:"
bin/zipalign.sh

echo "installing apk"
bin/install.sh
